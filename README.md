# Proyecto de Gestión de Tareas

## Descripción

Este es un proyecto full stack para la gestión de tareas que permite:

- Crear tareas
- Listarlas
- Marcar como completadas
- Filtrar por estado

---

## Tecnologías utilizadas

- Backend: .NET 8 Web API
- Frontend: React + Redux-Saga
- Base de datos: SQL Server
- Aplicación móvil: React Native (Expo)
- Contenedores: Docker y Docker Compose

---

## Requisitos previos

Asegúrate de tener instalado lo siguiente:

- Docker y Docker Compose
- Node.js >= 20
- .NET 8 SDK
- SQL Server
- Expo CLI (para ejecutar la app móvil)

---

## Configuración del SDK (.NET)

Es necesario tener instalado el SDK de .NET 8 y configurado como variable de entorno.

### En Windows

Agregar la siguiente ruta al PATH del sistema:

```
C:\Program Files\dotnet\
```

Verificar que esté correctamente configurado con:

```bash
dotnet --version
```

## Cómo levantar la aplicación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/proyecto-gestion-tareas.git
cd proyecto-gestion-tareas
```

### 2. Levantar todos los servicios con Docker Compose

```bash
docker-compose up --build
```

### 3. Acceder a las aplicaciones

- Frontend: http://localhost:7135
- Backend API: http://localhost:7135

---

## Ejecutar la app móvil con Expo

```bash
npm install -g expo-cli
cd mobile
npm install
expo start
```

Luego, escanea el código QR con la app Expo Go desde tu celular.

---

## Explicación de la arquitectura

### Backend (.NET 8 Web API)

- Endpoints REST para listar, crear y actualizar tareas
- Validaciones de entrada
- Integración con SQL Server mediante Entity Framework Core

### Frontend (React + Redux-Saga)

- Dashboard de tareas
- Formulario para crear nuevas tareas
- Filtros por estado
- Estado global manejado con Redux
- Lógica asíncrona con Redux-Saga

### App móvil (React Native + Expo)

- Pantallas para ver y crear tareas
- Consumo de la misma API del backend
- Sincronización en tiempo real con el backend

---

## Archivos importantes

- docker-compose.yml → definición de servicios
- backend/ → código fuente del API en .NET
- frontend/ → aplicación React
- mobile/ → app React Native
- sql/ → scripts para inicializar la base de datos

