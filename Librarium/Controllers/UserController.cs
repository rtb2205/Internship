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

    }
}
