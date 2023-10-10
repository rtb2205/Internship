using Librarium.Data;
using Librarium.Models;
using Microsoft.EntityFrameworkCore;

namespace Librarium.Services
{
    public class GenreService : Service<Genre>
    {
        public GenreService(DataContext context) : base(context) { }

    }
}