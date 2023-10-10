using System.ComponentModel.DataAnnotations;

namespace Librarium.Models
{
    public class GenreResponse
    {
        [Required]
        public string? Id { get; set; }
        [Required]
        public string? Name { get; set; }
    }
}
