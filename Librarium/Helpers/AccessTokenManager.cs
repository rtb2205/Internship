using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Librarium.Helpers
{
    public class AccessTokenManager
    {
        public static IHttpContextAccessor _httpContextAccessor;

        public AccessTokenManager(IHttpContextAccessor httpContextAccessor)
        { 
            _httpContextAccessor = httpContextAccessor;
        }
        public static string GetUsername(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var tokenRead = handler.ReadJwtToken(token);
            var username = "";

            IEnumerable<Claim> claims = tokenRead.Claims;
            foreach (Claim claim in claims)
            {
                if (claim.Type.ToString().ToLower().Contains("name")) username = claim.Value;
            }

            return username;
        }
    }
}
