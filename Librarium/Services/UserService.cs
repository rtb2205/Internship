using Librarium.Data;
using Librarium.Filters;
using Librarium.Models;

namespace Librarium.Services

{
    public class UserService : Service<User, DefaultFilter>
    {
        public UserService(DataContext context) : base(context)
        {

        }

        public override Task<string?> Add(User item)
        {
            var isNameTaken = _dbSet.Any(el => el.Username == item.Username);
            if (isNameTaken)
                return null;
            var passwordHashed = BCrypt.Net.BCrypt.HashPassword(item.Password);
            item.Password = passwordHashed;
            return base.Add(item);
        }
    }
}
