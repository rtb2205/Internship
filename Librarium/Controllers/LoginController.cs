using Azure.Core;
using Librarium.Data;
using Librarium.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace Librarium.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController: ControllerBase
    {
        private readonly DataContext _dataContext;

        public LoginController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpPost]
        public async Task<ActionResult<User>> Check(UserRequest userRequest)
        { 
            var user = _dataContext.Users.FirstOrDefault(el => el.Username == userRequest.Username);
            if (user is null) {
                return BadRequest();
            }

            var passwordVerification = BCrypt.Net.BCrypt.Verify(userRequest.Password, user.Password);
            if (!passwordVerification)
            {
                return BadRequest();
            }
            string token = CreateToken(user);
            var response = new { AccessToken = token, Username = user.Username, Role = user.Role };
            return Ok(JsonSerializer.Serialize(response));
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>() {  new Claim (ClaimTypes.Name, user.Username ),
            new Claim ( ClaimTypes.Role, user.Role )};
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("mySuperSecretKey_secretkey123!"));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(claims:claims, expires:DateTime.Now.AddDays(1),signingCredentials:cred, audience:"MyAuthClient", issuer:"MyAuthServer");
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}
