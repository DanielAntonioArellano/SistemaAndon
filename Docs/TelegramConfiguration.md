## 🔄 Flujo

1. Se actualiza la producción mediante un SP (`sp_update_production_info_with_outbox`).
2. Se inserta un evento JSON en la tabla `"Outbox"`.
3. El servicio `OutboxProcessorService` consulta eventos no procesados.
4. Se envía un mensaje a Telegram usando `TelegramService`.
5. Si falla, el intento se reprograma.

## 📬 Ejemplo de mensaje en Telegram
🚨 Falla actualizada en Producción #1
👤 Operador: Carlos López
🕰️ Fecha: 2025-10-20 11:40
🔁 Anterior: Sin falla
❗ Nueva: Motor sobrecalentado

Copiar código
