using AutoMapper;
using Librarium.Filters;
using Librarium.Models;
using Librarium.Services;
using Microsoft.AspNetCore.Mvc;

namespace Librarium.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LanguageController : MyController<Language, LanguageRequest, LanguageResponse, DefaultFilter>
    {

        protected readonly Service<AppFile, DefaultFilter> _appFileService;
        public LanguageController(Service<Language, DefaultFilter> service, Service<AppFile, DefaultFilter> appFileService, IMapper mapper) : base(service, mapper) 
        {
            _appFileService = appFileService;
        }

        [HttpPost("addAppFile/{id}")]
        public async Task<ActionResult<string?>> AddPicture(AppFileRequest request, [FromRoute] string id)
        {
            var newImage = _mapper.Map<AppFileRequest, AppFile>(request);
            var resultImage = await _appFileService.Add(newImage);
            if (resultImage == null)
            {
                return BadRequest("Couldn't attach picture");
            }
            return Ok(await _service.AttachAppFile(resultImage, id));
        }
    }
}

