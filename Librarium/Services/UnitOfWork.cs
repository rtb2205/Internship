/*using Microsoft.EntityFrameworkCore;
namespace Librarium.Services
{
    public class UnitOfWork: IDisposable
    {
        private DbContext db;
        private BookService _bookService;
        private GenreService _genreService;
        private LanguageService _languageService;

        public BookService Books
        {
            get
            {
                if (_bookService == null)
                    _bookService = new BookService(db);
                return _bookService;
            }
        }

        public GenreService Genres
        {
            get
            {
                if (_genreService == null)
                    _genreService = new GenreService(db);
                return _genreService;
            }
        }

        public LanguageService Languages
        {
            get
            {
                if (_languageService == null)
                    _languageService = new LanguageService(db);
                return _languageService;
            }
        }


        public void Save()
        {
            db.SaveChanges();
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
                this.disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
*/