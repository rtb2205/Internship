using Helpers.AutoMapperProfiles;
using Librarium.Filters;
using Librarium.Models;
using Librarium.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Librarium.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : MyController<Book, BookRequest, BookResponse, BooksFilter>
    {
        protected readonly Service<AppFile, DefaultFilter> _appFileService;
        public BookController(Service<Book, BooksFilter> service, Service<AppFile, DefaultFilter> appFileService) : base(service)
        {
            _appFileService = appFileService;
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
            var curBook = await _service.Get(id);
            var newItem = AutoMapperProfile<Book, BookResponse>.Transform(curBook);
            if (curBook?.AppFileId != null)
            {
                await _appFileService.Delete(curBook.AppFileId);
            }
            var result = await _service.AttachAppFile(resultImage, id);
            return Ok(result);
            
        }

    }
}

