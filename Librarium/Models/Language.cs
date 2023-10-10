using System.ComponentModel.DataAnnotations;

namespace Librarium.Models
{
    public class Language
    {
        [Required]
        public string? Id { get; set; }
        [Required]
        public string? Name { get; set; }
    }
}
