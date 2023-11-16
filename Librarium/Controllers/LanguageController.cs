using Helpers.AutoMapperProfiles;
using Librarium.Filters;
using Librarium.Models;
using Librarium.Services;
using Microsoft.AspNetCore.Mvc;

namespace Librarium.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LanguageController : AppFileOwnerController<Language, LanguageRequest, LanguageResponse, DefaultFilter>
    {
        public LanguageController(Service<Language, DefaultFilter> service, Service<AppFile, DefaultFilter> appFileService) : base(service, appFileService)
        { }

        [HttpGet]
        public virtual async Task<ActionResult<List<Language>>> GetAll([FromQuery] DefaultFilter filter)
        {
            return await _service.GetAll(filter);
        }
    }
}

