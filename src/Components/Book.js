import React from "react";
import "./Book.css";
import { Card, Container } from "react-bootstrap";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import languages from "./languages.json";
import { Tooltip } from "react-tooltip";

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
      <h4>{rating}</h4>
    </Badge>
  );
}

function Language({ language }) {
  let languageStruct = languages.find((item) => item.code == language);
  if (!languageStruct) return;
  let languageUrl = languageStruct.img;
  let languageFullName = languageStruct.fullname;
  return (
    <>
      <img
        src={languageUrl}
        className="ms-2 language"
        data-tooltip-id="language-tooltip"
        data-tooltip-content={languageFullName}
      />
      <Tooltip id="language-tooltip" />
    </>
  );
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
          <Badge bg={price == 0 ? "danger" : "success"} style={{ top: 0 }}>
            {" "}
            {price == 0 ? "FREE" : price + " USD"}
          </Badge>
        </div>
      </Button>
    </div>
  );
}

function Description({ text }) {
  const [showDescription, setShowDescription] = useState(false);

  const descContainerStyle = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
    justifyContent: "Space-Between",
    width: "98%",
    top: "25%",
  };

  return (
    <div style={descContainerStyle}>
      <div>
        <Button
          style={{ position: "relative", zIndex: "2" }}
          onMouseEnter={() => setShowDescription(true)}
          onMouseLeave={() => setShowDescription(false)}
        >
          <img src="./icons/Other/info-square-fill.svg" alt="Info" />
        </Button>
      </div>

      {showDescription && (
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <Card.Text>{text}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

function BookHeader({ language, author, date }) {
  return (
    <div className="w-100 d-flex mb-3 justify-content-between">
      <div className="me-2" style={{ fontSize: "1.2vw", opacity: 0.3 }}>
        ({date})
      </div>
      <>•</>
      <div className="me-2 ms-2" style={{ fontSize: "1.2vw", opacity: 0.3 }}>
        {author}
      </div>
      <>•</>
      <Language language={language}></Language>
    </div>
  );
}

export default function Book({ book, bookStyle = {} }) {
  //Only for tests start
  let price = book.price;
  let rating = book.rating;
  let title = book.title;
  let language = book.language;
  let author = book.author;
  let date = book.publication_year;
  let img = book.img;
  let description = book.description;
  // Only for tests end

  return (
    <Card
      style={bookStyle}
      border="light"
      data-bs-theme="dark"
      className="d-flex p-2 book "
    >
      <div className="my-cover-container position-relative container-fluid">
        <Rating rating={rating} />
        <Description text={description} />
        <Card.Img className="card-image" src={img} />
      </div>
      <Card.Body className="d-flex flex-column align-items-center">
        <Card.Title className="w-100">{title}</Card.Title>
        {/* <Card.Text style={{ opacity: 0.8 }}>{description}</Card.Text> */}
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
