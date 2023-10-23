using System.ComponentModel.DataAnnotations;

namespace Librarium.Models
{
    public class AppFileResponse
    {
        [Required]
        public string? Id { get; set; }
        [Required]
        public string Path { get; set; } = string.Empty;

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Extension { get; set; } = string.Empty;
    }
}
