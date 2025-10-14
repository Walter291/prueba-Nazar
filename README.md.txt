- Descripción

Proyecto de gestión de tareas que permite:

Crear tareas

Listarlas

Marcar como completadas

Filtrar por estado

Incluye:

Backend en .NET 8 Web API

Frontend en React + Redux-Saga

Base de datos SQL Server

App móvil en React Native

Contenedores Docker y Docker Compose

- Requisitos

Docker & Docker Compose

Node.js >= 20

.NET 8 SDK

SQL Server

Expo CLI (para la app móvil)


- Puertos usados

Backend: 5000 (HTTP) / 5001 (HTTPS)

Frontend: 80 (mapear a 3000 local)

SQL Server: 1433

- Cómo levantar la app

Levantar todos los servicios con Docker Compose

Acceder al frontend en el navegador

Acceder al backend vía API

Ejecutar la app móvil con Expo Go y escanear el QR

- Explicación de cada parte

Backend: endpoints para listar y crear tareas, validaciones, integración con SQL Server.

Frontend: dashboard con lista de tareas, formulario de creación y opción de marcar tareas completadas, manejo de estados con Redux-Saga.

App móvil: consumo de la API, pantallas de lista y creación de tareas, interacción con el backend.

- Archivos importantes

Scripts SQL para la base de datos

Proyectos backend, frontend y móvil

Dockerfiles para backend y frontend

docker-compose.yml


- Criterios de Evaluación

Uso correcto de Redux-Saga

Buenas prácticas en .NET Core

Estructura clara y organizada en React

Conexión correcta a SQL Server desde el backend

Integración de la app móvil con el backend

Documentación clara y completa
