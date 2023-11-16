using System.ComponentModel.DataAnnotations;

namespace Librarium.Models
{
    public class Genre: Model
    {
        [Required]
        public string? Name { get; set; }
    }
}
