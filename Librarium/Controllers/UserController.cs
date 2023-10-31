using Librarium.Filters;
using Librarium.Models;
using Librarium.Services;
using Microsoft.AspNetCore.Mvc;

namespace Librarium.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : MyController<User, User, UserResponse, DefaultFilter>
    {
        public UserController(Service<User, DefaultFilter> service) : base(service) { }

        [HttpGet]
        public virtual async Task<ActionResult<List<User>>> GetAll([FromQuery] DefaultFilter? filter = null)
        {
            return await _service.GetAll(filter);
        }
    }
}
