using System.ComponentModel.DataAnnotations;

namespace Librarium.Models
{
    public class ImageRequest
    {
        [Required]
        public string? Url { get; set; }
    }
}
