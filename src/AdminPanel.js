import React from "react";
import Navibar from "./Components/Navibar.js";
import BooksList from "./Components/BooksList.js";
import { Container } from "react-bootstrap";
import "./App.css";

export default function AdminPanel() {
  return (
    <>
      <Navibar />
      <BooksList />
    </>
  );
}
