import NaviBar from "./Components/Navibar";
import Slider from "./Components/Slider";
import BookShelf from "./Components/BookShelf";
import React, { useState } from "react";

import "./App.css";
import { Toast, ToastBody } from "react-bootstrap";

export default function Home() {
  return (
    <div className="page">
      <NaviBar />
      <Slider />
      <BookShelf />
    </div>
  );
}
