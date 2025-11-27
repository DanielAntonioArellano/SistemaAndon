# Arquitectura general
El sistema sigue una arquitectura de microservicio ligero.  
El backend expone endpoints REST que consumen datos de PostgreSQL.  
El servicio `OutboxProcessorService` monitorea la tabla `Outbox` y envía notificaciones a Telegram.

```mermaid
flowchart TD
  A[Frontend React] -->|HTTP| B[API .NET]
  B -->|SQL| C[(PostgreSQL)]
  B --> D[OutboxProcessorService]
  D -->|HTTP| E[Telegram Bot]
# 01. Arquitectura técnica






## 🧩 Componentes

- **Frontend (React):** interfaz de usuario para operadores y supervisores.
- **Backend (Users.Api):** API RESTful que gestiona producciones y envía eventos.
- **Base de datos (PostgreSQL):** almacena información de producción y eventos Outbox.
- **TelegramService:** servicio interno del backend que envía notificaciones.
- **OutboxProcessorService:** daemon en segundo plano que procesa eventos pendientes y los entrega a Telegram.

---

## ⚙️ Patrón Outbox

El patrón **Outbox** garantiza que los eventos (notificaciones) se procesen de forma confiable incluso ante fallos.  
Cuando se actualiza una producción, se registra simultáneamente un evento en la tabla `Outbox`.  
Posteriormente, el servicio `OutboxProcessorService` procesa estos eventos y los envía a Telegram.

---