import React from "react";
import Navibar from "./Components/Navibar.js";
import BooksList from "./Components/BooksList.js";

export default function AdminPanel() {
  return (
    <>
      <Navibar />
      <BooksList />
    </>
  );
}
