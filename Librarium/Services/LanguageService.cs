using Librarium.Data;
using Librarium.Models;
using Microsoft.EntityFrameworkCore;

namespace Librarium.Services
{
    public class LanguageService : Service<Language>
    {
        public LanguageService(DataContext context) : base(context) { }
    }

}
