using Librarium.Models;
using Microsoft.EntityFrameworkCore;

namespace Librarium.Services
{
    public class LanguageService : Service<Language>
    {
        public LanguageService(DbContext context) : base(context) { }
    }

}
