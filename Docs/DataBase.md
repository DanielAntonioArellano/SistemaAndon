### 🧾 **04-BaseDeDatos.md**
- Diagrama ER (puedo ayudarte a generarlo con tu esquema actual)
- Descripción de tablas:
  - `Productions`
  - `Outbox`
  - `Users`
  - `Lines`
  - `Workstations`
  - `Lines`
  - `Machines`
  - `AreaModels`

- Stored procedures relevantes:
  - `sp_update_production_info`
  - `sp_update_production_info_with_outbox`

  ## 📋 Tablas principales

### 🏭 "Productions"
| Campo | Tipo | Descripción |
|--------|------|-------------|
| ProductionId | SERIAL | Identificador principal |
| Model | TEXT | Modelo de producto |
| Status | TEXT | Estado actual |
| Operator | TEXT | Nombre del operador |
| Failure | TEXT | Descripción de la falla |

### 📨 "Outbox"
| Campo | Tipo | Descripción |
|--------|------|-------------|
| Id | SERIAL | Identificador del evento |
| EventType | TEXT | Tipo de evento |
| Payload | JSONB | Datos relacionados |
| Processed_At | TIMESTAMP | Fecha de envío exitoso |
| Attempts | INT | Intentos de reenvío |