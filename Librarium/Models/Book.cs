﻿using System.ComponentModel.DataAnnotations;

namespace Librarium.Models
{
    public class Book
    {
        public Book()
        {
            Id = Guid.NewGuid().ToString();
        }
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
        public string? GenreId { get; set; }
        public Genre? Genre { get; set; }
        [Required]
        public string? LanguageId { get; set; }
        public Language? Language { get; set; }
        [Required]
        public float Rating { get; set; }
        [Required]
        public float Price { get; set; }
        public string? ImageId { get; set; }
        public Image? Image { get; set; }
        [Required]
        public string? Description { get; set; }
    }
}
