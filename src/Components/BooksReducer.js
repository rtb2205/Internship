export default function BooksReducer(books, action) {
  switch (action.type) {
    case "added": {
      return [
        ...books,
        {
          ...action.book,
        },
      ];
    }
    case "changed": {
      return books.map((t) => {
        if (t.id === action.book.id) {
          return action.book;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return books.filter((t) => t.id !== action.book.id);
    }
    default:
      return books;
  }
}
