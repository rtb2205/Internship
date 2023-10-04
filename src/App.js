import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import AdminPanel from "./AdminPanel";
import { Navigate } from "react-router-dom";
import {
  BooksContext,
  BooksDispatchContext,
  GenresContext,
  LanguageContext,
} from "./Components/BooksContext";
import { useReducer } from "react";
import booksJson from "./Components/books.json";
import genresJson from "./Components/genres.json";
import languagesJson from "./Components/languages.json";
import BooksReducer from "./Components/BooksReducer";

export default function App() {
  // localStorage.clear();
  let booksArr = JSON.parse(localStorage.getItem("books"));
  if (booksArr == null) {
    localStorage.setItem("books", JSON.stringify(booksJson));
    booksArr = booksJson.slice();
  }

  let genresArr = JSON.parse(localStorage.getItem("genres"));
  if (genresArr == null) {
    localStorage.setItem("genres", JSON.stringify(genresJson));
    genresArr = genresJson.slice();
  }

  let languagesesArr = JSON.parse(localStorage.getItem("languages"));
  if (languagesesArr == null) {
    localStorage.setItem("languages", JSON.stringify(languagesJson));
    languagesesArr = languagesJson.slice();
  }

  const [books, dispatch] = useReducer(BooksReducer, booksArr);

  return (
    <BooksContext.Provider value={books}>
      <BooksDispatchContext.Provider value={dispatch}>
        <GenresContext.Provider value={genresArr}>
          <LanguageContext.Provider value={languagesesArr}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/adminPanel" element={<AdminPanelOrHome />} />
              </Routes>
            </BrowserRouter>
          </LanguageContext.Provider>
        </GenresContext.Provider>
      </BooksDispatchContext.Provider>
    </BooksContext.Provider>
  );

  function AdminPanelOrHome() {
    if (localStorage.getItem("admin") === "true") return <AdminPanel />;
    else return <Navigate replace to="/" />;
  }
}
