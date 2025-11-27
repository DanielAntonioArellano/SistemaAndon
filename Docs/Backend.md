# 02. Backend (.NET 8)

El backend fue desarrollado con **C# y ASP.NET Core 8**, implementando servicios, controladores y tareas en segundo plano.

## 🧱 Capas principales

- **Controllers/** → manejan solicitudes HTTP.
- **Services/** → lógica de negocio (OutboxProcessorService, TelegramService, etc.).
- **Models/** → entidades mapeadas con la BD.
- **BackgroundService:** encargado de revisar la tabla Outbox cada 30 segundos.

## 🔁 Flujo de actualización
1. Se ejecuta el stored procedure `sp_update_production_info_with_outbox`.
2. Se actualiza la tabla `"Productions"`.
3. Se inserta un registro en `"Outbox"`.
4. `OutboxProcessorService` detecta el evento y envía la notificación a Telegram.
