using AutoMapper;
using Librarium.Data;
using Librarium.Filters;
using Librarium.Models;
using Microsoft.EntityFrameworkCore;

namespace Librarium.Services
{
    public class GenreService : Service<Genre, DefaultFilter>
    {
        public GenreService(DataContext context, IMapper mapper) : base(context, mapper) { }

    }
}