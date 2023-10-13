using System.ComponentModel.DataAnnotations;

namespace Librarium.Models
{
    public class ImageResponse
    {
        [Required]
        public string? Id { get; set; }
        [Required]
        public string? Url { get; set; }
    }
}
