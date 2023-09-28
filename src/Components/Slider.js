import React from "react";
import { Badge, Carousel, Container } from "react-bootstrap";
import books from "./books.json";
import Book from "./Book.js";
import "./Slider.css";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import OwlCarousel from "react-owl-carousel";

export default function Slider() {
  return (
    <Container className="p-2 d-flex flex-column align-items-center">
      <OwlCarousel items={4} className="owl-theme mt-1" loop nav margin={8}>
        {books.map((book) => {
          return <Book book={book} key={book.isbn} />;
        })}
      </OwlCarousel>
    </Container>
  );
}
