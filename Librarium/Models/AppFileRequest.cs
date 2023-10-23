using System.ComponentModel.DataAnnotations;

namespace Librarium.Models
{
    public class AppFileRequest
    {
        [Required]
        public FormFile? FormFile { get; set; }
    }
}
