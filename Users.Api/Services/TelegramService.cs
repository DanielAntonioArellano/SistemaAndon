using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Encodings.Web;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Polly;
using Polly.Retry;

namespace Users.Api.Services
{
    public class TelegramOptions
    {
        public string BotToken { get; set; } = "";
        public string ChatId { get; set; } = "";
        public int MaxMessageLength { get; set; } = 4000;
        public int MaxRetries { get; set; } = 3;
        public int RetryBaseDelayMs { get; set; } = 500;
        public bool UseHtml { get; set; } = true;
        public bool Enabled { get; set; } = true;
    }

    public class TelegramService : ITelegramService
    {
        private readonly HttpClient _http;
        private readonly TelegramOptions _opts;
        private readonly ILogger<TelegramService> _logger;
        private readonly AsyncRetryPolicy<HttpResponseMessage> _retryPolicy;

        public TelegramService(IHttpClientFactory httpFactory, IOptions<TelegramOptions> opts, ILogger<TelegramService> logger)
        {
            _opts = opts.Value;
            _logger = logger;
            _http = httpFactory.CreateClient("telegram");

            _retryPolicy = Policy<HttpResponseMessage>
                .HandleResult(r => (int)r.StatusCode >= 500 || r.StatusCode == System.Net.HttpStatusCode.RequestTimeout)
                .WaitAndRetryAsync(_opts.MaxRetries,
                    attempt => TimeSpan.FromMilliseconds(_opts.RetryBaseDelayMs * Math.Pow(2, attempt - 1)),
                    (res, ts, retryCount, ctx) =>
                    {
                        _logger.LogWarning("Telegram send retry {RetryCount} status {Status}", retryCount, res.Result?.StatusCode);
                    });
        }

        public Task<bool> SendMessageAsync(string text, CancellationToken ct = default)
            => SendMessageAsync(_opts.ChatId, text, ct);

        public async Task<bool> SendMessageAsync(string chatId, string text, CancellationToken ct = default)
        {
            if (!_opts.Enabled)
            {
                _logger.LogInformation("TelegramService disabled by configuration.");
                return false;
            }

            if (string.IsNullOrWhiteSpace(_opts.BotToken))
            {
                _logger.LogError("TelegramService: BotToken not configured.");
                return false;
            }

            if (string.IsNullOrWhiteSpace(chatId))
            {
                _logger.LogError("TelegramService: chatId is empty.");
                return false;
            }

            if (text.Length > _opts.MaxMessageLength)
                text = text.Substring(0, _opts.MaxMessageLength - 3) + "...";

            var finalText = _opts.UseHtml ? HtmlEncoder.Default.Encode(text) : text;

            var payload = new
            {
                chat_id = chatId,
                text = finalText,
                parse_mode = _opts.UseHtml ? "HTML" : "MarkdownV2",
                disable_web_page_preview = true
            };

            var uri =  $"https://api.telegram.org/bot{_opts.BotToken}/sendMessage";

            try
            {
                var response = await _retryPolicy.ExecuteAsync(async () =>
                {
                    var httpContent = JsonContent.Create(payload);
                    return await _http.PostAsync(uri, httpContent, ct);
                });

                var body = await response.Content.ReadAsStringAsync(ct);

                if (response.IsSuccessStatusCode)
                {
                    _logger.LogInformation("Telegram message sent successfully (chat {ChatId}).", chatId);
                    return true;
                }

                _logger.LogWarning("Telegram API returned {Status}. Response: {Body}", response.StatusCode, body);
                return false;
            }
            catch (OperationCanceledException) when (ct.IsCancellationRequested)
            {
                _logger.LogWarning("Telegram send canceled.");
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending Telegram message.");
                return false;
            }
        }
    }
}
