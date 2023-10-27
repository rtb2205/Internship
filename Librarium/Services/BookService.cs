using Librarium.Data;
using Librarium.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace Librarium.Services
{
    public class BookService : Service<Book, BooksFilter>
    {

        public BookService(DataContext context) : base(context)
        { }
        protected override IQueryable<Book> ApplyInclude(IQueryable<Book> query)
        {
            return query
                .Include(b => b.Genre)
                .Include(b => b.Language)
                .ThenInclude(l => l.AppFile)
                .Include(b=>b.AppFile);
        }
        protected override IQueryable<Book> ApplyFilter(IQueryable<Book> query, BooksFilter? filter = null)
        {
            if (!(filter?.GenreId is null))
                query = query.Where(b => b.GenreId == filter.GenreId);
            if (!(filter?.Price is null))
                query = query.Where(b => b.Price <= filter.Price);
            if (!(filter?.Title is null))
                query = query.Where(b => b.Title != null && b.Title.Contains(filter.Title));
            if (!(filter?.LanguageId is null))
                query = query.Where(b => b.LanguageId == filter.LanguageId);
            if (!(filter?.Rating is null))
                query = query.Where(b => b.Rating >= filter.Rating);
            return query;
        }

        public override async Task<string?> AttachAppFile(string appFileId, string OwnerId)
        {
            var result = await _dbSet.FindAsync(OwnerId);
            if (result == null)
                return null;

            result.AppFileId = appFileId;
            await _context.SaveChangesAsync();
            return result.AppFileId;
        }
    }

}
