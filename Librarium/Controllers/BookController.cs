using Helpers.AutoMapperProfiles;
using Librarium.Data;
using Librarium.Filters;
using Librarium.Models;
using Librarium.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Data.Entity;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Librarium.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : MyController<Book, BookRequest, BookResponse, BooksFilter>
    {
        protected readonly Service<AppFile, DefaultFilter> _appFileService;
        public DataContext context;
        public BookController(Service<Book, BooksFilter> service, Service<AppFile, DefaultFilter> appFileService, DataContext context) : base(service)
        {
            _appFileService = appFileService;
            this.context = context;
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


        [HttpGet]
        public new async Task<ActionResult<Tuple<List<Book>, PaginationInfo>>> GetAll([FromQuery] BooksFilter? filter = null)
        {

            var query = context.Books.AsQueryable();

            query = _service.ApplyInclude(query);

            var originalCount = query.Count();
            if (!(filter?.GenreId is null))
                query = query.Where(b => b.GenreId == filter.GenreId);
            if (!(filter?.Price is null))
                query = query.Where(b => b.Price <= filter.Price);
            if (!(filter?.Title is null))
                query = query.Where(b => b.Title != null && b.Title.Contains(filter.Title));
            if (!(filter?.LanguageId is null))
                query = query.Where(b => b.LanguageId == filter.LanguageId);
            if (!(filter?.Rating is null))
                query = query.Where(b => b.Rating >= filter.Rating);

            var curCount = query.Count();
            var currentPage = filter.CurrentPage;
            var booksPerPage = filter.BooksPerPage;
            var pagesAmount = (int)Math.Ceiling((double)curCount / booksPerPage);

            if (curCount != originalCount)
            {
                filter.CurrentPage = 1;
            }

            query = query.Skip((currentPage - 1) * booksPerPage).Take(booksPerPage);
            return Ok(new Tuple<IQueryable<Book>, PaginationInfo>(query, new PaginationInfo { BooksPerPage = booksPerPage, CurrentPage = currentPage, PagesAmount = pagesAmount }));

        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public override async Task<ActionResult<string>> Delete(string id)
        {
            Book? book = await _service.Get(id);
            if (book == null)
            {
                return null;
            }
            
            AppFile? appFile = book.AppFile;
            if (appFile != null)
            {
               await _appFileService.Delete(appFile.Id);
            }
            return await base.Delete(id);
        }

    }
}

