import NaviBar from "./Components/Navibar";
import Slider from "./Components/Slider";
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
