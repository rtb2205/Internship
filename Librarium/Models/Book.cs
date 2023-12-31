﻿using System.ComponentModel.DataAnnotations;

namespace Librarium.Models
{
    public class Book: ModelWithAppFile
    {
        [Required]
        public string? Title { get; set; }
        [Required]
        public string? Author { get; set; }
        [Required]
        public int PublicationYear { get; set; }
        [Required]
        public string? Isbn { get; set; }
        [Required]
        public string? GenreId { get; set; }
        public Genre? Genre { get; set; }
        [Required]
        public string? LanguageId { get; set; }
        public Language? Language { get; set; }
        [Required]
        public float Rating { get; set; }
        [Required]
        public float Price { get; set; }

        [Required]
        public string? Description { get; set; }
    }
}
