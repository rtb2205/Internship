using System.ComponentModel.DataAnnotations;

namespace Librarium.Models
{
    public class AppFileRequest
    {
        [Required]
        public IFormFile? file { get; set; }
    }
}
