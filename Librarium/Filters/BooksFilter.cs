using Librarium.Filters;

namespace Librarium.Models;

public class BooksFilter: IFilter
{
    public string? Title { get; set; }
    public float? Rating { get; set; }
    public float? Price { get; set; }
    public string? LanguageId { get; set; }
    public string? GenreId { get; set; }

    public int CurrentPage { get; set; } = 1;
    public int BooksPerPage { get; set; } = 4;
    public int BooksAmount { get; set; }
}
