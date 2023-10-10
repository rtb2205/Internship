using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace Librarium.Models
{
    public class BookResponse
    {

        [Required]
        public string? Id { get; set; }
        [Required]
        public string? Title { get; set; }
        [Required]
        public string? Author { get; set; }
        [Required]
        public int PublicationYear { get; set; }
        [Required]
        public string? Isbn { get; set; }
        [Required]
        public Genre? Genre { get; set; }
        [Required]
        public Language? Language { get; set; }
        [Required]
        public float Rating { get; set; }
        [Required]
        public float Price { get; set; }
        [Required]
        public string? ImageUrl { get; set; }
        [Required]
        public string? Description { get; set; }

    };
}
