using Microsoft.EntityFrameworkCore;
using Nazar.Api.Models;

namespace Nazar.Api.Data
{
    public class NazarContext : DbContext
    {
        public NazarContext(DbContextOptions<NazarContext> options) : base(options) { }

        public DbSet<Tarea> Tareas { get; set; }
    }
}
