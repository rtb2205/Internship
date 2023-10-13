import NaviBar from "./Components/Navibar";
import Slider from "./Components/Slider";
import BookShelf from "./Components/BookShelf";
import React, { useEffect, useState } from "react";

import "./App.css";
import { GetData } from "./Components/BackEndApi";
import {
  BooksContext,
  GenresContext,
  LanguageContext,
} from "./Components/Contexts";

export default function Home() {
  const [books, setBooks] = useState(null);
  const [genres, setGenres] = useState(null);
  const [languages, setLanguages] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const initialBooks = await GetData("Book");
      const initialGenres = await GetData("Genre");
      const initialLanguages = await GetData("Language");
      setBooks(initialBooks);
      setGenres(initialGenres);
      setLanguages(initialLanguages);
      debugger;
    };
    fetchData();
  }, []);

  if (!(books && languages && genres)) return;
  <>Loading...</>;

  return (
    <div className="page bg-dark bg-gradient">
      <NaviBar />
      <BooksContext.Provider value={books}>
        <LanguageContext.Provider value={languages}>
          <GenresContext.Provider value={genres}>
            <Slider />
            <BookShelf />
          </GenresContext.Provider>
        </LanguageContext.Provider>
      </BooksContext.Provider>
    </div>
  );
}
