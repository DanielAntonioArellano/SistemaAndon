using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;

namespace Users.Api.Services
{
    public class OutboxProcessorService : BackgroundService
    {
        private readonly ILogger<OutboxProcessorService> _logger;
        private readonly IConfiguration _config;
        private readonly IServiceProvider _sp;
        private readonly string _connStr;
        private readonly int _batchSize = 10;
        private readonly int _delaySeconds = 5;

        public OutboxProcessorService(ILogger<OutboxProcessorService> logger, IConfiguration config, IServiceProvider sp)
        {
            _logger = logger;
            _config = config;
            _sp = sp;
            _connStr = config.GetConnectionString("Database");
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("OutboxProcessorService started.");
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    await ProcessOnce(stoppingToken);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error in OutboxProcessor main loop.");
                }
                await Task.Delay(TimeSpan.FromSeconds(_delaySeconds), stoppingToken);
            }
        }

        private async Task ProcessOnce(CancellationToken ct)
        {
            await using var conn = new NpgsqlConnection(_connStr);
            await conn.OpenAsync(ct);

            await using var tx = await conn.BeginTransactionAsync(ct);

            var selectCmd = new NpgsqlCommand(@"
                SELECT id, payload
                FROM outbox
                WHERE processed_at IS NULL
                  AND (next_attempt_at IS NULL OR next_attempt_at <= now())
                ORDER BY created_at
                LIMIT @limit
                FOR UPDATE SKIP LOCKED;
            ", conn, tx);
            selectCmd.Parameters.AddWithValue("limit", _batchSize);

            var pending = new List<(long id, string payload)>();

            await using (var reader = await selectCmd.ExecuteReaderAsync(ct))
            {
                while (await reader.ReadAsync(ct))
                {
                    pending.Add((reader.GetInt64(0), reader.GetString(1)));
                }
            }

            if (pending.Count == 0)
            {
                await tx.CommitAsync(ct);
                return;
            }

            var ids = pending.ConvertAll(p => p.id).ToArray();
            var updateAttemptsCmd = new NpgsqlCommand("UPDATE outbox SET attempts = attempts + 1 WHERE id = ANY(@ids)", conn, tx);
            updateAttemptsCmd.Parameters.AddWithValue("ids", ids);
            await updateAttemptsCmd.ExecuteNonQueryAsync(ct);

            await tx.CommitAsync(ct);

            using var scope = _sp.CreateScope();
            var telegram = (ITelegramService)scope.ServiceProvider.GetService(typeof(ITelegramService));

            foreach (var item in pending)
            {
                try
                {
                    var payloadJson = JsonDocument.Parse(item.payload);
                    var root = payloadJson.RootElement;

                    // Función auxiliar segura que ignora mayúsculas/minúsculas
                    string? GetSafe(JsonElement el, string key)
                    {
                        foreach (var prop in el.EnumerateObject())
                            if (string.Equals(prop.Name, key, StringComparison.OrdinalIgnoreCase))
                                return prop.Value.ToString();
                        return null;
                    }

                    // Lectura segura de propiedades
                    var productionIdStr = GetSafe(root, "ProductionId");
                    int.TryParse(productionIdStr, out var productionId);

                    var previousFailure = GetSafe(root, "PreviousFailure") ?? GetSafe(root, "Failure") ?? "Sin dato previo";
                    var newFailure = GetSafe(root, "NewFailure") ?? GetSafe(root, "Failure") ?? "Sin nueva falla";
                    var operatorName = GetSafe(root, "Operator") ?? "Desconocido";
                    var model = GetSafe(root, "Model") ?? "Desconocido";
                    var status = GetSafe(root, "Status") ?? "Sin estado";
                    var timestamp = GetSafe(root, "Timestamp") ?? DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

                    // Construcción dinámica del mensaje (depende de los datos disponibles)
                    var message = $"⚙️ *Actualización de Producción*\n\n" +
                                  $"🏭 ID Producción: {productionId}\n" +
                                  $"🧩 Modelo: {model}\n" +
                                  $"📊 Estado: {status}\n" +
                                  $"👷 Operador: {operatorName}\n" +
                                  $"🕒 Fecha: {timestamp}\n";

                    // Si hay fallas, se agregan al mensaje
                    if (!string.IsNullOrWhiteSpace(previousFailure) || !string.IsNullOrWhiteSpace(newFailure))
                    {
                        message += $"🔁 Anterior: {previousFailure}\n" +
                                   $"❗ Nueva: {newFailure}\n";
                    }

                    // Envía mensaje por Telegram
                    var ok = await telegram.SendMessageAsync(message, ct);

                    if (ok)
                    {
                        await using var conn2 = new NpgsqlConnection(_connStr);
                        await conn2.OpenAsync(ct);
                        var markCmd = new NpgsqlCommand("UPDATE outbox SET processed_at = now() WHERE id = @id", conn2);
                        markCmd.Parameters.AddWithValue("id", item.id);
                        await markCmd.ExecuteNonQueryAsync(ct);
                        _logger.LogInformation("Outbox id {Id} processed.", item.id);
                    }
                    else
                    {
                        await using var conn2 = new NpgsqlConnection(_connStr);
                        await conn2.OpenAsync(ct);
                        var backoffCmd = new NpgsqlCommand(@"
                UPDATE outbox
                SET next_attempt_at = now() + (INTERVAL '1 minute' * attempts)
                WHERE id = @id
            ", conn2);
                        backoffCmd.Parameters.AddWithValue("id", item.id);
                        await backoffCmd.ExecuteNonQueryAsync(ct);
                        _logger.LogWarning("Telegram send failed for outbox id {Id}. Will retry.", item.id);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error processing outbox id {Id}", item.id);
                    await using var conn2 = new NpgsqlConnection(_connStr);
                    await conn2.OpenAsync(ct);
                    var errCmd = new NpgsqlCommand(@"
            UPDATE outbox
            SET last_error = coalesce(last_error || E'\n', '') || @err::text,
                next_attempt_at = now() + INTERVAL '1 minute'
            WHERE id = @id
        ", conn2);
                    errCmd.Parameters.AddWithValue("err", ex.ToString());
                    errCmd.Parameters.AddWithValue("id", item.id);
                    await errCmd.ExecuteNonQueryAsync(ct);
                }
            }

        }
    }
}
