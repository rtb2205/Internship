using System.ComponentModel.DataAnnotations;

namespace Librarium.Models
{
    public class Language: ModelWithAppFile
    {
        [Required]
        public string? Name { get; set; }

       
    }
}
