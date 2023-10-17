using System.ComponentModel.DataAnnotations;

namespace Librarium.Models
{
    public abstract class Model
    {
        [Required]
        public string? Id { get; set; }
    }
}
