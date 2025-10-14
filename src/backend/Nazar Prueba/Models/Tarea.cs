namespace Nazar.Api.Models
    {
        public class Tarea
        {
            public int Id { get; set; }
            public string Titulo { get; set; } = string.Empty;
            public string? Descripcion { get; set; }
            public bool Estado { get; set; } = false;
            public DateTime FechaCreacion { get; set; } = DateTime.Now;
        }
    }


