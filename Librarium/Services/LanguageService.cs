using AutoMapper;
using Librarium.Data;
using Librarium.Filters;
using Librarium.Models;

namespace Librarium.Services
{
    public class LanguageService : Service<Language, DefaultFilter>
    {
        protected readonly Service<AppFile, DefaultFilter> _appFileService;
        public LanguageService(DataContext context, Service<AppFile, DefaultFilter> appFileService, IMapper mapper) : base(context, mapper) { _appFileService = appFileService; }
        public override IQueryable<Language> ApplyInclude(IQueryable<Language> query)
        {
            return query
                .Include(b => b.AppFile);
        }
    }
}
