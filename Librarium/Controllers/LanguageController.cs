﻿using AutoMapper;
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
        public LanguageController(Service<Language, DefaultFilter> service): base(service) { }
    }
}

