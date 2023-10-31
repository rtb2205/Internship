using Helpers.AutoMapperProfiles;
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
        public LanguageController(Service<Language, DefaultFilter> service, Service<AppFile, DefaultFilter> appFileService) : base(service)
        {
            _appFileService = appFileService;
        }

        [HttpGet]
        public virtual async Task<ActionResult<List<Language>>> GetAll([FromQuery] DefaultFilter? filter = null)
        {
            return await _service.GetAll(filter);
        }

        [HttpPost("addApplicationFile/{id}")]
        public virtual async Task<ActionResult<Book>> Post(string id, [FromForm] AppFileRequest appFileRequest)
        {
            var request = appFileRequest;
            var newImage = AutoMapperProfile<AppFileRequest, AppFile>.Transform(request);
            await _appFileService.SaveInServer(appFileRequest, newImage);

            var resultImage = await _appFileService.Add(newImage);
            if (resultImage == null)
            {
                return BadRequest("Couldn't attach picture");
            }
            var curLanguage = await _service.Get(id);
            var newItem = AutoMapperProfile<Language, LanguageResponse>.Transform(curLanguage);
            if (curLanguage?.AppFileId != null)
            {
                await _appFileService.Delete(curLanguage.AppFileId);
            }
            var result = await _service.AttachAppFile(resultImage, id);
            return Ok(result);

        }

    }
}

