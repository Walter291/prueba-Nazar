-- Crear base de datos
CREATE DATABASE Nazar;
GO

USE Nazar;
GO

-- Crear tabla principal de tareas
CREATE TABLE Tareas (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Titulo NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(255) NULL,
    Estado BIT NOT NULL DEFAULT 0, -- 0 = pendiente, 1 = completada
    FechaCreacion DATETIME NOT NULL DEFAULT GETDATE()
);
GO

-- Procedimiento para listar todas las tareas
CREATE PROCEDURE sp_ListarTareas
AS
BEGIN
    SELECT Id, Titulo, Descripcion, Estado, FechaCreacion
    FROM Tareas
    ORDER BY FechaCreacion DESC;
END;
GO

-- Procedimiento para crear una nueva tarea
CREATE PROCEDURE sp_CrearTarea
    @Titulo NVARCHAR(100),
    @Descripcion NVARCHAR(255)
AS
BEGIN
    INSERT INTO Tareas (Titulo, Descripcion)
    VALUES (@Titulo, @Descripcion);
    
    SELECT SCOPE_IDENTITY() AS NuevaTareaId;
END;
GO

-- Procedimiento para marcar una tarea como completada
CREATE PROCEDURE sp_MarcarTareaCompletada
    @Id INT
AS
BEGIN
    UPDATE Tareas
    SET Estado = 1
    WHERE Id = @Id;
END;
GO

-- Procedimiento para filtrar tareas por estado
CREATE PROCEDURE sp_FiltrarTareasPorEstado
    @Estado BIT
AS
BEGIN
    SELECT Id, Titulo, Descripcion, Estado, FechaCreacion
    FROM Tareas
    WHERE Estado = @Estado
    ORDER BY FechaCreacion DESC;
END;
GO


-- Insertar datos iniciales
INSERT INTO Tareas (Titulo, Descripcion, Estado, FechaCreacion)
VALUES 
('dato de prueba', 'caso de uso', 1, GETDATE())
GO

-- Verificación rápida
SELECT * FROM Tareas;
GO