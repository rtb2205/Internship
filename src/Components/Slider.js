import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import Book from "./Book.js";
import "./Slider.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import OwlCarousel from "react-owl-carousel";
import { BooksContext } from "./BooksContext.js";

export default function Slider() {
  const books = useContext(BooksContext);
  const sortedBooks = books.sort((a, b) => b.rating - a.rating);
  const topBooks = sortedBooks.slice(0, 5);
  return (
    <Container className="p-2 d-flex flex-column align-items-center">
      <OwlCarousel items={4} className="owl-theme mt-1" loop nav margin={8}>
        {topBooks.map((book) => {
          return <Book book={book} key={book.id} />;
        })}
      </OwlCarousel>
    </Container>
  );
}
