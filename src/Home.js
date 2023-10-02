import NaviBar from "./Components/Navibar";
import Slider from "./Components/Slider";
import Book from "./Components/Book";
import BookShelf from "./Components/BookShelf";
import React from "react";

import "./App.css";

export default function Home() {
  return (
    <div className="page bg-dark bg-gradient">
      <NaviBar />
      <Slider />
      <BookShelf />
    </div>
  );
}
