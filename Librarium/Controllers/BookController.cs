using Helpers.AutoMapperProfiles;
using Librarium.Data;
using Librarium.Filters;
using Librarium.Models;
using Librarium.Services;
using Microsoft.AspNetCore.Mvc;
using System.Data.Entity;

namespace Librarium.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class BookController : AppFileOwnerController<Book, BookRequest, BookResponse, BooksFilter>
    {
        public BookController(Service<Book, BooksFilter> service, Service<AppFile, DefaultFilter> _appFileService) : base(service, _appFileService)
        {}

        [HttpGet]
        public ActionResult<Tuple<IQueryable<Book>, PaginationInfo>> GetAll([FromQuery] BooksFilter filter)
        {
            return Ok(((BookService)_service).GetAll(filter)) ;
        }
    }
}

