using System.ComponentModel.DataAnnotations;

namespace Librarium.Models
{
    public class AppFile: Model
    {
        public AppFile()
        {
            Id = Guid.NewGuid().ToString();
        }

        [Required]
        public string Path { get; set; } = string.Empty;

        [Required]
        public string Name { get; set; }= string.Empty;

        [Required]
        public string Extension {  get; set; }=string.Empty;
    }
}
