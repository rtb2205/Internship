﻿using System.ComponentModel.DataAnnotations;

namespace Librarium.Models
{
    public class Language
    {
        public Language()
        {
            Id = Guid.NewGuid().ToString();
        }
        [Required]
        public string? Id { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public string? ImageUrl {  get; set; }
        [Required]
        public Image? Image { get; set; }
    }
}
