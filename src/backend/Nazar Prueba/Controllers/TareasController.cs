using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nazar.Api.Data;
using Nazar.Api.Models;
using Microsoft.Data.SqlClient;


namespace Nazar.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TareasController : ControllerBase
    {
        private readonly NazarContext _context;

        public TareasController(NazarContext context)
        {
            _context = context;
        }

        //validación de conexión hacia la base de datos Nazar

        //[HttpGet("testconexion")]
        //public async Task<IActionResult> TestConexion()
        //{
        //    try
        //    {
        //        // Obtiene la cadena de conexión actual
        //        var connection = _context.Database.GetDbConnection();

        //        await connection.OpenAsync();
        //        await connection.CloseAsync();

        //        return Ok("Conexión a la base de datos exitosa.");
        //    }
        //    catch (SqlException ex)
        //    {
        //        return StatusCode(500, $"Error al conectar con la base de datos: {ex.Message}");
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Error inesperado: {ex.Message}");
        //    }
        //}


        // GET /api/ lista tareas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tarea>>> GetTareas()
        {
            return await _context.Tareas.OrderByDescending(t => t.FechaCreacion).ToListAsync();
        }

        // POST /api/crea tareas
        [HttpPost("crear")]
        public async Task<ActionResult<Tarea>> CrearTarea([FromBody] Tarea tarea)
        {
            if (tarea == null || string.IsNullOrWhiteSpace(tarea.Titulo))
                return BadRequest("El título es obligatorio.");

            tarea.FechaCreacion = DateTime.Now;
            _context.Tareas.Add(tarea);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTareas), new { id = tarea.Id }, tarea);
        }

        // PUT /api/tareas/{id}/marca tareas completdas
        [HttpPut("{id}/completar")]
        public async Task<IActionResult> MarcarCompletada(int id)
        {
            var tarea = await _context.Tareas.FindAsync(id);
            if (tarea == null)
                return NotFound();

            tarea.Estado = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET /api/tareas/filtrar?estado=true
        [HttpGet("filtrar")]
        public async Task<ActionResult<IEnumerable<Tarea>>> FiltrarPorEstado(bool estado)
        {
            var tareas = await _context.Tareas
                .Where(t => t.Estado == estado)
                .OrderByDescending(t => t.FechaCreacion)
                .ToListAsync();

            return tareas;
        }
    }
}
