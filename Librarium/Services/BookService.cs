using Librarium.Data;
using Librarium.Models;
using Microsoft.EntityFrameworkCore;

namespace Librarium.Services
{
    public class BookService: Service<Book>
    {
        public BookService(DataContext context): base(context){}
        public override async Task<Book?> Get(string id)
        {
            var result = await _dbSet.Where(b=>b.Id == id).Include(b => b.Language).Include(b => b.Genre).FirstOrDefaultAsync();
            if (result is null)
                return null;
            return result;
        }

        public override async Task<List<Book>> GetAll()
        {
            var result = await _context.Books.Include(b=>b.Language).Include(b=>b.Genre).ToListAsync();
            return result;
        }
    }

}
