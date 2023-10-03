import { createContext } from "react";

export const BooksContext = createContext(null);
export const BooksDispatchContext = createContext(null);

function handleAddBook(dispatch, newBook) {
  dispatch({
    type: "added",
    book: newBook,
  });
}

function handleChangeBook(dispatch, modifiedBook) {
  dispatch({
    type: "changed",
    book: modifiedBook,
  });
}

function handleDeleteBook(dispatch, modifiedBook) {
  dispatch({
    type: "deleted",
    id: modifiedBook.id,
  });
}
