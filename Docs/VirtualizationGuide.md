
## 🧠 Objetivo
Preparar el entorno del Sistema Andon en contenedores **LXC** administrados por **Proxmox VE**.

## 🧱 Contenedores sugeridos

| Servicio | Sistema base | Recursos | Descripción |
|-----------|--------------|-----------|--------------|
| api-lxc | Ubuntu 22.04 | 2 CPU / 2 GB RAM | Ejecuta Users.Api |
| web-lxc | Ubuntu 22.04 | 1 CPU / 1 GB RAM | Sirve React con Nginx |
| db-lxc | Debian 12 | 2 CPU / 2 GB RAM | PostgreSQL |
| msg-lxc | Ubuntu 22.04 | 1 CPU / 512 MB | Servicio OutboxProcessor |

## 🧭 Pasos iniciales
1. Instalar **Proxmox VE**.
2. Crear contenedores LXC.
3. Configurar red y acceso SSH.
4. Instalar dependencias (dotnet, node, postgres).
5. Desplegar el código y restaurar base de datos.
