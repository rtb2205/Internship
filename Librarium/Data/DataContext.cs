global using Microsoft.EntityFrameworkCore;
using Librarium.Models;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Librarium.Data
{
    public class DataContext : DbContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public DataContext(DbContextOptions<DataContext> options, IHttpContextAccessor httpContextAccessor) : base(options)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Server=localhost\\MSSQLSERVER01;Database=booksdb;Trusted_Connection=true;TrustServerCertificate=true;");
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            Model model;
            DateTime time = DateTime.Now;

            var entries = ChangeTracker.Entries().Where(entry => entry.Entity is Model).ToList();

            
            var token = _httpContextAccessor.HttpContext!.Request.Headers["Authorization"].FirstOrDefault()?.Substring("Bearer ".Length);
            if (token == null)
            {
                return base.SaveChangesAsync(cancellationToken);
            }
            var handler = new JwtSecurityTokenHandler();
            var tokenRead = handler.ReadJwtToken(token);
            var username = "";

            IEnumerable<Claim> claims = tokenRead.Claims;
            foreach (Claim claim in claims)
            {
                if (claim.Type.ToString().ToLower().Contains("name")) username = claim.Value;
            }


            foreach (var entry in entries.Where(e => e.State == EntityState.Added))
            {
               
                entry.SetPropertyValue(nameof(model.CreatedBy), username);
                entry.SetPropertyValue(nameof(model.CreationDate), time);
                entry.SetPropertyValue(nameof(model.ModificationDate), time);
                entry.SetPropertyValue(nameof(model.ModifiedBy), username);
            }

            foreach (var entry in entries.Where(e => e.State == EntityState.Modified))
            {
                if (entry.GetPropertyValue(nameof(model.CreatedBy)) == null)
                {
                    entry.SetPropertyValue(nameof(model.CreatedBy), username);
                    
                }
                if (entry.GetPropertyValue(nameof(model.CreationDate)) == null)
                {
                    entry.SetPropertyValue(nameof(model.CreationDate), time);
                }
                entry.SetPropertyValue(nameof(model.ModificationDate), time);
                entry.SetPropertyValue(nameof(model.ModifiedBy), username);
            }

            
            return base.SaveChangesAsync(cancellationToken);
    }
       


    public DbSet<Book> Books { get; set; }
    public DbSet<Genre> Genres { get; set; }
    public DbSet<Language> Languages { get; set; }
    public DbSet<AppFile> AppFiles { get; set; }

    public DbSet<User> Users { get; set; }

}
    public static class EntityEntryEx
    {
        public static void SetPropertyValue<T>(this EntityEntry entry, string propertyName, T value)
        {
            entry.Property(propertyName).CurrentValue = value;
        }
        public static object? GetPropertyValue(this EntityEntry entry, string propertyName)
        {
            return entry.Property(propertyName)?.CurrentValue;
        }
    }
}
