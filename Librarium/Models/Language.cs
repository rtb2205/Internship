using System.ComponentModel.DataAnnotations;

namespace Librarium.Models
{
    public class Language: Model
    {
        public Language()
        {
            Id = Guid.NewGuid().ToString();
        }

        [Required]
        public string? Name { get; set; }
        public string? AppFileId { get; set; }
        public AppFile? AppFile { get; set; }
    }
}
