using Librarium.Data;
using Librarium.Filters;
using Librarium.Models;
using Microsoft.EntityFrameworkCore;

namespace Librarium.Services
{
    public class LanguageService : Service<Language, DefaultFilter>
    {
        public LanguageService(DataContext context) : base(context) { }
    }

}
