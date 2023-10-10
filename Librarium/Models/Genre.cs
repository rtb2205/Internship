using System.ComponentModel.DataAnnotations;

namespace Librarium.Models
{
    public class Genre
    {
        public Genre()
        {
            Id = Guid.NewGuid().ToString();
        }
        [Required]
        public string? Id { get; set; }
        [Required]
        public string? Name { get; set; }
    }
}
