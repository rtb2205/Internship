import React from "react";
import { Carousel } from "react-bootstrap";
import books from "./books.json";


export default function Slider() {
  let items = books
    .sort(function (a, b) {
      return parseFloat(a.rating) - parseFloat(b.rating);
    })
    .slice(0, 10);

  let bestSellers = items.map((item) => (
    <Carousel.Item key={item.isbn}>
      <div>
        <p>{item.title}</p>
        <img src={item.img}></img>
      </div>
    </Carousel.Item>
  ));

  console.log(books[0].img);
  return <Carousel>{bestSellers}</Carousel>;
}
