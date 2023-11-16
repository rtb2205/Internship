using System.ComponentModel.DataAnnotations;

namespace Librarium.Models
{
    public abstract class Model
    {

        public Model() {
            Id = Guid.NewGuid().ToString();
        }
        [Required]
        public string Id { get; set; }
        public DateTime? CreationDate { get; set; }
        public DateTime? ModificationDate { get; set; }
        public string? CreatedBy { get; set; }
        public string? ModifiedBy { get; set; }

    }
}
