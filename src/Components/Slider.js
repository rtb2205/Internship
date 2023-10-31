import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import Book from "./Book.js";
import "./Slider.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import OwlCarousel from "react-owl-carousel";
import { Initialize } from "./BackEndApi.js";
import { useState } from "react";

export default function Slider() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    Initialize(setBooks, "Book");
  }, []);

  const topBooks = books?.sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <Container className="p-2 d-flex flex-column align-items-center">
      <OwlCarousel
        items={Math.min(topBooks?.length, 4)}
        className="owl-theme mt-1 d-flex"
        loop
        nav
        margin={8}
      >
        {topBooks.map((book) => {
          return <Book book={book} key={book.id} />;
        })}
      </OwlCarousel>
    </Container>
  );
}
