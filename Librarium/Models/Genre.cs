using System.ComponentModel.DataAnnotations;

namespace Librarium.Models
{
    public class Genre: Model
    {
        public Genre()
        {
            Id = Guid.NewGuid().ToString();
        }
        [Required]
        public string? Name { get; set; }
    }
}
