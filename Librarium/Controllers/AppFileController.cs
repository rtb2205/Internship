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
        public AppFileController(Service<AppFile, DefaultFilter> service) : base(service)
        {}
        public override async Task<IActionResult> Add(AppFileRequest item)
        {
            return BadRequest(new { Errors = new { Error = "Not allowed to use this method" } });
        }

        public override async Task<IActionResult> Update(string id, AppFileRequest request)
        {
            return BadRequest(new { Errors = new { Error = "Not allowed to use this method" } });
        }


    }
}

