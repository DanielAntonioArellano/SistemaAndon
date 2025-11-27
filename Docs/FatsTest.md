Las pruebas FAT validan el funcionamiento integral del sistema antes de su despliegue.

## ✅ Objetivos
- Validar flujo completo desde el frontend hasta Telegram.
- Confirmar que los datos se guardan correctamente.
- Probar reconexión de Outbox en caso de fallo.

## 🧩 Casos básicos
| Caso | Descripción | Resultado esperado |
|------|--------------|--------------------|
| 1 | Actualizar producción con nueva falla | Se guarda y se envía mensaje Telegram |
| 2 | Outbox falla en primer intento | Se reintenta luego de 1 minuto |
| 3 | Usuario cambia foto de perfil | Se actualiza localStorage |