using Librarium.Data;
using Librarium.Models;
using Microsoft.EntityFrameworkCore;

namespace Librarium.Services
{
    public class BookService : Service<Book, BooksFilter>
    {

        public BookService(DataContext context) : base(context)
        {

        }
        public override async Task<Book?> Get(string id)
        {
            var result = await _dbSet.Where(b => b.Id == id).Include(b => b.Language).Include(b => b.Genre).FirstOrDefaultAsync();
            if (result is null)
                return null;
            return result;
        }

        public override async Task<List<Book>> GetAll(BooksFilter? filter = null)
        {
            var result = _context.Books.AsQueryable();

            result = ApplyInclude(result);

            return await result.ToListAsync();
        }
        protected IQueryable<Book> ApplyInclude(IQueryable<Book> query)
        {
            return query
                .Include(b => b.Genre).Include(b => b.Language);
        }

        protected IQueryable<Book> ApplyFilter(IQueryable<Book> query, BooksFilter filter)
        {
            if (!(filter.GenreId is null))
                query = query.Where(b => b.GenreId == filter.GenreId);
            if (!(filter.Price is null))
                query = query.Where(b => b.Price <= filter.Price);
            if (!(filter.Title is null))
                query = query.Where(b => b.Title != null && b.Title.Contains(filter.Title));
            if (!(filter.LanguageId is null))
                query = query.Where(b => b.LanguageId == filter.LanguageId);
            if (!(filter.Rating is null))
                query = query.Where(b => b.Rating >= filter.Rating);
            return query;
        }
    }

}
