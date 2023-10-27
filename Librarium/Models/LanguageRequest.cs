using System.ComponentModel.DataAnnotations;

namespace Librarium.Models
{
    public class LanguageRequest
    {
        [Required]
        public string? Name { get; set; }
        public string? AppFileId {  get; set; }
    }
}
