using AutoMapper;
using Helpers.AutoMapperProfiles;
using Librarium.Filters;
using Librarium.Models;
using Librarium.Services;
using Microsoft.AspNetCore.Mvc;

namespace Librarium.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : MyController<Image, ImageRequest, ImageResponse, DefaultFilter>
    {
        public ImageController(Service<Image, DefaultFilter> service): base(service) { }
    }
}

