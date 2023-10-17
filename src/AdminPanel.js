import React, { useEffect } from "react";
import Navibar from "./Components/Navibar.js";
import BooksList from "./Components/BooksList.js";
import {
  BooksContext,
  GenresContext,
  LanguageContext,
} from "./Components/Contexts.js";
import "./App.css";
import { useState } from "react";
import { Initialize } from "./Components/BackEndApi.js";

export default function AdminPanel() {
  return (
    <>
      <Navibar />
      <BooksList />
    </>
  );
}
