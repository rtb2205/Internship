namespace Librarium.Models;

public class BooksFilter
{
    public string? Title { get; set; }
    public string? GenreId { get; set; }
    public float? Rating { get; set; }
    public float? Price { get; set; }
    public string? LanguageId { get; set; }
}
