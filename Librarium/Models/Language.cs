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
        public string? ImageId {  get; set; }
        public Image? Image { get; set; }
    }
}
