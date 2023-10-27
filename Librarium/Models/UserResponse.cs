using System.ComponentModel.DataAnnotations;

namespace Librarium.Models
{
    public class UserResponse
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Role {  get; set; }
    }
}
