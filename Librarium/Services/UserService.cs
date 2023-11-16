using AutoMapper;
using Librarium.Data;
using Librarium.Filters;
using Librarium.Helpers;
using Librarium.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading;

namespace Librarium.Services

{
    public class UserService : Service<User, DefaultFilter>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserService(DataContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor) : base(context, mapper)
        {
            _httpContextAccessor = httpContextAccessor;    
        }

        public override async Task<string> Update<RequestType>(string id, RequestType request)
        {
            var User = await Get<User>(id);
            var token = _httpContextAccessor.HttpContext!.Request.Headers["Authorization"].FirstOrDefault()?.Substring("Bearer ".Length);
          
            if (User.Username == AccessTokenManager.GetUsername(token))
            {
                throw new Exception("You cannot edit your info");
            }
                
            return await base.Update(id, request);
        }

        public override async Task<string?> Delete(string id)
        {
            var User = await Get<User>(id);
            var token = _httpContextAccessor.HttpContext!.Request.Headers["Authorization"].FirstOrDefault()?.Substring("Bearer ".Length);

            if (User.Username == AccessTokenManager.GetUsername(token))
            {
                throw new Exception("You cannot remove your info");
            }
            return await base.Delete(id);
        }
        public override Task<string> Add<RequestType>(RequestType request)
        {
            var item = _mapper.Map<User>(request);
            var isNameTaken = _dbSet.Any(el => el.Username == item.Username);
            if (isNameTaken)
                return Task.FromResult("Username is already taken");
            var passwordHashed = BCrypt.Net.BCrypt.HashPassword(item.Password);
            item.Password = passwordHashed;
            return base.Add(item);
        }
    }
}
