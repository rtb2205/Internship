using AutoMapper;
using Helpers.AutoMapperProfiles;
using Librarium.Filters;
using Librarium.Models;
using Librarium.Services;
using Microsoft.AspNetCore.Mvc;

namespace Librarium.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : MyController<Genre, GenreRequest, GenreResponse, DefaultFilter>
    {
        public GenreController(Service<Genre, DefaultFilter> service, IMapper mapper) : base(service, mapper) { }

        
    }
}

