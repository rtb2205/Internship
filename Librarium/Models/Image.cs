using System.ComponentModel.DataAnnotations;

namespace Librarium.Models
{
    public class Image: Model
    {
        public Image()
        {
            Id = Guid.NewGuid().ToString();
        }

        [Required]
        public string? Url { get; set; }
    }
}
