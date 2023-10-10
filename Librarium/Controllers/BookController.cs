using AutoMapper;
using Helpers.AutoMapperProfiles;
using Librarium.Models;
using Librarium.Services;
using Microsoft.AspNetCore.Mvc;

namespace Librarium.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {

        private readonly BookService BookService;

        public BookController(BookService bookService)
        {        
            this.BookService = bookService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Book>>> GetAll()
        {
            return await BookService.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> Get(string id)
        {
            var result = await BookService.Get(id);
            if (result is null)
                return NotFound("Book not found.");
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<List<Book>>> Add(Book book)
        {
            var result = await BookService.Add(book);
            //var newBook = AutoMapperProfiles.Transform<BookRequest, Book>(book);
            //var result = await BookService.Add(newBook);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Book>>> Update(int id, Book request)
        {
            var result = await BookService.Update(id, request);
            if (result is null)
                return NotFound("Hero not found.");
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Book>>> Delete(int id)
        {
            var result = await BookService.Delete(id);
            if (result is null)
                return NotFound("Book not found.");
            return Ok(result);
        }
    }
}

