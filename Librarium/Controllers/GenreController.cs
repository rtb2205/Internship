using AutoMapper;
using Helpers.AutoMapperProfiles;
using Librarium.Models;
using Librarium.Services;
using Microsoft.AspNetCore.Mvc;

namespace Librarium.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : MyController<Genre, GenreRequest, GenreResponse>
    {
        public GenreController(Service<Genre> service): base(service) { }

        
    }
}

