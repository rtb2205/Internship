using Librarium.Data;
using Librarium.Filters;
using Librarium.Models;
using Microsoft.EntityFrameworkCore;

namespace Librarium.Services
{
    public class BookService : Service<Book, BooksFilter>
    {

        public BookService(DataContext context) : base(context)
        { }
        public override IQueryable<Book> ApplyInclude(IQueryable<Book> query)
        {
            return query
                .Include(b => b.Genre)
                .Include(b => b.Language)
                .ThenInclude(l => l.AppFile)
                .Include(b => b.AppFile);
        }
        protected new Tuple<IQueryable<Book>, PaginationInfo> ApplyFilter(IQueryable<Book> query, BooksFilter? filter = null)
        {
            var originalCount = query.Count();
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
            
            var curCount = query.Count();
            var currentPage = filter.CurrentPage;
            var booksPerPage = filter.BooksPerPage;
            var pagesAmount = (int)Math.Ceiling((double)curCount / booksPerPage);

            if (curCount != originalCount)
            {
                filter.CurrentPage = 1; 
            }    
            
            query = query.Skip((currentPage - 1) * booksPerPage).Take(currentPage * booksPerPage);
            return new Tuple<IQueryable<Book>, PaginationInfo> (query,new PaginationInfo { BooksPerPage = booksPerPage, CurrentPage = currentPage, PagesAmount = pagesAmount});
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
