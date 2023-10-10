using Librarium.Models;
using Microsoft.EntityFrameworkCore;

namespace Librarium.Services
{
    public class GenreService : Service<Genre>
    {
        public GenreService(DbContext context) : base(context) { }

    }
}