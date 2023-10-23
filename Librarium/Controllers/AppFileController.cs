using AutoMapper;
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
        public AppFileController(Service<AppFile, DefaultFilter> service, IMapper mapper) : base(service, mapper) { }
        public override async Task<ActionResult<string?>> Add(AppFileRequest item)
        {
            return await Task.FromResult(Forbid("Not allowed to use this method"));
        }

        public override async Task<ActionResult<string?>> Update(string id, AppFileRequest request)
        {
            return await Task.FromResult(Forbid("Not allowed to use this method"));
        }

        public override async Task<ActionResult<List<AppFile>>> Delete(string id)
        {
            return await Task.FromResult(Forbid("Not allowed to use this method"));
        }

        public override async Task<ActionResult<List<AppFile>>> GetAll([FromQuery] DefaultFilter? filter = null)
        {
            return await Task.FromResult(Forbid("Not allowed to use this method"));
        }
    }
}

