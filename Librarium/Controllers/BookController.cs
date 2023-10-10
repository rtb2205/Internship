﻿using AutoMapper;
using Helpers.AutoMapperProfiles;
using Librarium.Models;
using Librarium.Services;
using Microsoft.AspNetCore.Mvc;

namespace Librarium.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : MyController<Book, BookRequest, BookResponse>
    {
        public BookController(Service<Book> service): base(service) { }
    }
}

