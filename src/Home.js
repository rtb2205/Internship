import NaviBar from "./Components/Navibar";
import Slider from "./Components/Slider";
import Book from "./Components/Book";
import React from "react";
import { Container } from "react-bootstrap";

export default function Home() {
  return (
    <div className=" bg-dark bg-gradient">
      <NaviBar />
      <Slider />
    </div>
  );
}
