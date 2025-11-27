# 🏭 Sistema Andon OEE

Sistema Andon desarrollado para monitoreo y gestión de fallas en procesos de producción.  
Implementa una arquitectura moderna basada en **.NET + React + PostgreSQL**, con un sistema de mensajería integrado mediante **Telegram Bot** utilizando el patrón **Outbox**.

---

## 🚀 Tecnologías principales

| Componente       | Tecnología |
|------------------|-------------|
| Frontend         | React + Styled Components |
| Backend API      | .NET 8 (C#) |
| Base de Datos    | PostgreSQL |
| Mensajería       | Telegram Bot API |
| Patrón de Integración | Outbox Pattern |
| Virtualización (planeada) | Proxmox + LXC Containers |

---

## 📂 Estructura del proyecto

SistemaAndon/
│
├── Users.Api/ # Backend principal (.NET)
│ ├── Controllers/ # Endpoints principales
│ ├── Services/ # Lógica de negocio y servicios
│ ├── Models/ # Entidades y DTOs
│ ├── appsettings.json # Configuración general
│ └── Program.cs # Punto de entrada
│
├── client/ # Frontend (React)
│ ├── src/components/ # Componentes UI
│ ├── src/hooks/ # Hooks personalizados
│ ├── src/pages/ # Páginas principales
│ └── src/services/ # Conexión con API
│
├── database/ # Scripts SQL y stored procedures
│ ├── schema.sql
│ └── sp_update_production_info_with_outbox.sql
│
└── docs/ # Documentación técnica


---

## ⚙️ Configuración del entorno

### 🔧 Requisitos

- .NET 8 SDK  
- Node.js 18+  
- PostgreSQL 15 o superior  
- Git  
- Editor recomendado: Visual Studio Code  

### 🔑 Variables de entorno

#### En `Users.Api/appsettings.json`
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=andon;Username=postgres;Password=1234"
  },
  "Telegram": {
    "BotToken": "<TU_BOT_TOKEN>",
    "ChatId": "<ID_DEL_CHAT>"
  }
}
▶️ Ejecución del sistema
Backend
bash
Copiar código
cd Users.Api
dotnet run
Frontend
bash
Copiar código
cd client
npm install
npm start
La aplicación estará disponible en:

Backend: http://localhost:5086

Frontend: http://localhost:3000

📊 Características principales
Gestión de producciones y fallas.

Envío automático de alertas a Telegram.

Persistencia en base de datos PostgreSQL.

Implementación del patrón Outbox para confiabilidad de eventos.

Interfaz responsiva con React.

Sistema de autenticación de usuarios.

🧠 Próximos pasos
Pruebas FAT (Factory Acceptance Test).

Virtualización del sistema en Proxmox mediante LXC containers.

Documentación técnica extendida (ver carpeta /docs).

👥 Créditos
Desarrollador: Daniel Arellano
Colaboradores: Equipo de desarrollo interno
Versión: 1.0.0



---

### 📄 **docs/00_Overview.md**
```markdown
# 00. Visión general del sistema

El **Sistema Andon OEE** permite la supervisión en tiempo real del estado de las líneas de producción.  
Cada estación o celda puede registrar fallas, operadores, modelos y estados, los cuales se reflejan en una interfaz web y en notificaciones automáticas mediante **Telegram**.

El proyecto busca mejorar la **eficiencia general del equipo (OEE)** y la **comunicación inmediata** en planta.

---