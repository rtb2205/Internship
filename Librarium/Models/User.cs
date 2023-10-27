using System.ComponentModel.DataAnnotations;

namespace Librarium.Models
{
    public class User: Model
    {
        [Required]
        public string Username {  get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Role { get; set; }
    }
}
