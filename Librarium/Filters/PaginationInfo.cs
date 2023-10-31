namespace Librarium.Filters
{
    public class PaginationInfo
    {
        public int CurrentPage { get; set; } = 1;
        public int BooksPerPage { get; set; } = 4;
        public int PagesAmount { get; set; }
    }
}
