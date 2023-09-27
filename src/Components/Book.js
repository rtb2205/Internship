import React from "react";
import "./Book.css";
import { Card, Container } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";

import languages from "./languages.json";

function Rating({ rating }) {
  let badgeVariant;
  let badgeBackgroundColor;

  if (rating >= 4) {
    badgeVariant = "success";
  } else if (rating >= 2) {
    badgeVariant = "warning";
  } else {
    badgeVariant = "danger";
  }

  return (
    <Badge bg={badgeVariant} className="rating">
      <h1>{rating}</h1>
    </Badge>
  );
}

function Language({ language }) {
  console.log("language " + language);
  let languageUrl = languages.find(item=> item.code === language).img;
  return(<img src={languageUrl}></img>);
}

function Purchase({ price }) {
  return (
    <div className="w-100  d-flex justify-content-end">
      <Button
        size="lg"
        variant="secondary"
        className="p-0"
        style={{ backgroundColor: "transparent" }}
      >
        <div className="purchase__wrapper d-flex align-items-center">
          <Badge bg="none" style={{ top: 0 }}>
            GET FOR
          </Badge>
          <Badge bg={price === 0 ? "danger" : "success"} style={{ top: 0 }}>
            {" "}
            {price === 0 ? "FREE" : price + " USD"}
          </Badge>
        </div>
      </Button>
    </div>
  );
}

function BookHeader({ language, author, date }) {
  console.log("BookHeader " + language);
  return (
    <div className="d-flex" style={{ opacity: 0.3 }}>
      <div className="me-2">({date})</div>
      <>•</>
      <div className="me-2 ms-2">{author}</div>
      <>•</>
      <Language className="ms-2" language = {language}>{language}</Language>
    </div>
  );
}

export default function Book() {
  //Only for tests start
  let price = 0;
  let rating = 4.1;
  let title = "The Girl with the Dragon Tattoo";
  let language = "en";
  let author = "Stieg Larson";
  let date = "1984";
  //Only for tests end
  console.log("Book " + language);
  return (
    <Card border="light" data-bs-theme="dark" className="d-flex p-2">
      <div className="position-relative container-fluid">
        <Rating rating={rating} />
        <Card.Img
          style={{ transform: "scale(0.95)" }}
          src="https://images.booksense.com/images/268/389/9780857389268.jpg"
        />
      </div>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text style={{ opacity: 0.8 }}>
          A journalist is aided by a young female hacker in his search for the
          killer of a woman who has been dead for forty years. A journalist is
          aided by a young female hacker in his search for the killer of a woman
          who has been dead for forty years..
        </Card.Text>
        <BookHeader
          language={language}
          author={author}
          date={date}
        ></BookHeader>
        <Purchase price={price} />
      </Card.Body>
    </Card>
  );
}

