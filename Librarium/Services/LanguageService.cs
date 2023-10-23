using Librarium.Data;
using Librarium.Filters;
using Librarium.Models;
using Microsoft.EntityFrameworkCore;

namespace Librarium.Services
{
    public class LanguageService : Service<Language, DefaultFilter>
    {
        public LanguageService(DataContext context) : base(context) { }
        protected override IQueryable<Language> ApplyInclude(IQueryable<Language> query)
        {
            return query
                .Include(b => b.AppFile);
        }

        public override async Task<string?> AttachAppFile(string appFileId, string OwnerId)
        {
            var result = await _dbSet.FindAsync(OwnerId);
            if (result == null)
            {
                return null;
            }
            result.AppFileId = appFileId;
            await _context.SaveChangesAsync();
            return result.AppFileId;
        }


    }

}
