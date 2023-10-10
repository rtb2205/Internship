using System.ComponentModel.DataAnnotations;

namespace Librarium.Models
{
    public class GenreRequest
    {
        [Required]
        public string? Name { get; set; }
    }
}
