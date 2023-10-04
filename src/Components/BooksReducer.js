export default function BooksReducer(books, action) {
  let newBooks;
  switch (action.type) {
    case "added": {
      newBooks = [
        ...books,
        {
          ...action.book,
        },
      ];
      break;
    }
    case "changed": {
      newBooks = books.map((t) => {
        if (t.id === action.book.id) {
          return action.book;
        } else {
          return t;
        }
      });
      break;
    }
    case "deleted": {
      newBooks = books.filter((t) => t.id !== action.book.id);
      break;
    }
    default: {
      newBooks = books;
    }
  }
  localStorage.setItem("books", JSON.stringify(newBooks));
  return newBooks;
}
