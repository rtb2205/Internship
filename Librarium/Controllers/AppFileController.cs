using Librarium.Filters;
using Librarium.Models;
using Librarium.Services;
using Microsoft.AspNetCore.Mvc;

namespace Librarium.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppFileController : MyController<AppFile, AppFileRequest, AppFileResponse, DefaultFilter>
    {
        private Service<Book, BooksFilter> _bookService;
        private Service<Language, DefaultFilter> _languageService;
        public AppFileController(Service<AppFile, DefaultFilter> service, 
            Service<Book, BooksFilter> bookService,
            Service<Language, DefaultFilter> languageService) : base(service) {
            _bookService = bookService;
            _languageService = languageService;
        }

       [HttpGet("/bookGetFile/{bookId}")]
        public async Task<IActionResult> BookGetFile(string bookId)
        {
            var owner = await _bookService.Get(bookId);
            if(owner is null)
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


        [HttpGet("/languageGetFile/{languageId}")]
        public async Task<IActionResult> LanguageGetFile(string languageId)
        {
            var owner = await _languageService.Get(languageId);
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

        public override async Task<ActionResult<string?>> Add(AppFileRequest item)
        {
            return await Task.FromResult(Forbid("Not allowed to use this method"));
        }

        public override async Task<ActionResult<string?>> Update(string id, AppFileRequest request)
        {
            return await Task.FromResult(Forbid("Not allowed to use this method"));
        }

        //public override async Task<ActionResult<string>> Delete(string id)
        //{
        //    return await Task.FromResult(Forbid("Not allowed to use this method"));
        //}

    }
}

