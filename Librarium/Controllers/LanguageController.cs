using AutoMapper;
using Helpers.AutoMapperProfiles;
using Librarium.Models;
using Librarium.Services;
using Microsoft.AspNetCore.Mvc;

namespace Librarium.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LanguageController : MyController<Language, LanguageRequest, LanguageResponse>
    {
        public LanguageController(Service<Language> service): base(service) { }
    }
}

