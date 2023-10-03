import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import AdminPanel from "./AdminPanel";
import { Navigate } from "react-router-dom";
import { BooksContext, BooksDispatchContext } from "./Components/BooksContext";
import { useReducer } from "react";
import booksJson from "./Components/books.json";
import BooksReducer from "./Components/BooksReducer";

export default function App() {
  const [books, dispatch] = useReducer(BooksReducer, booksJson);
  return (
    <BooksContext.Provider value={books}>
      <BooksDispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/adminPanel" element={<AdminPanelOrHome />} />
          </Routes>
        </BrowserRouter>
      </BooksDispatchContext.Provider>
    </BooksContext.Provider>
  );

  function AdminPanelOrHome() {
    console.log("test", localStorage.getItem("admin") == true);
    if (localStorage.getItem("admin") === "true") return <AdminPanel />;
    else return <Navigate replace to="/" />;
  }
}
