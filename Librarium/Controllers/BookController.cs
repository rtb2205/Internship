using AutoMapper;
using Helpers.AutoMapperProfiles;
using Librarium.Models;
using Librarium.Services;
using Microsoft.AspNetCore.Mvc;

namespace Librarium.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : MyController<Book, BookRequest, BookResponse, BooksFilter>
    {
        public BookController(Service<Book, BooksFilter> service): base(service) { }
    }
}

