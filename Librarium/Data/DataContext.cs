using Librarium.Models;
using Microsoft.EntityFrameworkCore;
using System.CodeDom.Compiler;

namespace Librarium.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Server=localhost\\MSSQLSERVER01;Database=booksdb;Trusted_Connection=true;TrustServerCertificate=true;");
      /*      optionsBuilder.Use*/
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<AppFile> AppFiles { get; set; }
    }
}
