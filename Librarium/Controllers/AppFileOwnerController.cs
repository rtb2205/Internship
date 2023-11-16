using Helpers.AutoMapperProfiles;
using Librarium.Filters;
using Librarium.Models;
using Librarium.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Librarium.Controllers
{
    public abstract class AppFileOwnerController<T, RequestType, ResponseType, FilterType> : MyController<T, RequestType, ResponseType, FilterType> where T : ModelWithAppFile where FilterType : class
    {
        protected readonly AppFileService _appFileService;
        public AppFileOwnerController(Service<T, FilterType> service, Service<AppFile, DefaultFilter> _appFileService) : base(service)
        {
            this._appFileService = (AppFileService)_appFileService;
        }
        [HttpPost("AttachAppFile/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<string>> AttachAppFile(string id, [FromForm] AppFileRequest appFileRequest)
        {
            T? item = await _service.Get<T>(id);
            if (item == null)
            {
                return BadRequest(typeof(T).Name + " doesn't exist");
            }
            if (appFileRequest != null)
            {
                item.AppFileId = await _appFileService.Add(appFileRequest, id);
            }
            return await _service.Update(id, item);
        }

        [HttpGet("GetAppFile/{ownerId}")]
        public async Task<IActionResult> GetAppFile(string ownerId)
        {
            var owner = await _service.Get<ModelWithAppFile>(ownerId);
            if (owner is null)
                return NotFound();
            var file = owner.AppFile;
            if (file is null)
            {
                return NotFound();
            }
            FileStream fileStream = new FileStream(file.Path + "\\" + file.Name, FileMode.OpenOrCreate);

            if (fileStream is null)
            {
                return NotFound();
            }
            var extension = file.Extension + (file.Extension == "svg" ? "+xml" : "");
            return File(fileStream, "image/" + extension, file.Name);

        }
    }
}
