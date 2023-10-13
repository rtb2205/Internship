using System.ComponentModel.DataAnnotations;

namespace Librarium.Models
{
    public class Image
    {
        public Image()
        {
            Id = Guid.NewGuid().ToString();
        }
        [Required]
        public string? Id { get; set; }
        [Required]
        public string? Url { get; set; }
    }
}
