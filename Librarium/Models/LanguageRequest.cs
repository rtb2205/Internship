using System.ComponentModel.DataAnnotations;

namespace Librarium.Models
{
    public class LanguageRequest
    {
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? AppFileId {  get; set; }
    }
}
