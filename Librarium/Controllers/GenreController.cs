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

        [HttpGet]
        public virtual async Task<ActionResult<List<Genre>>> GetAll([FromQuery] DefaultFilter? filter = null)
        {
            return await _service.GetAll(filter);
        }
        public GenreController(Service<Genre, DefaultFilter> service) : base(service) { }

        
    }
}

