import React, { useEffect } from "react";
import "./Book.css";
import { Card } from "react-bootstrap";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { Tooltip } from "react-tooltip";
import { Initialize } from "./BackEndApi";

export default function Book({ book, bookStyle = {} }) {
  function Rating({ rating }) {
    let badgeVariant;

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

  function Genre({ genre }) {
    return (
      <Badge bg="primary" className="genre">
        <h6>{genre?.name}</h6>
      </Badge>
    );
  }

  function Language({ language, languageId }) {
    let languageFullName = language?.name;

    return (
      <>
        <img
          src={"http://localhost:5157/api/Language/GetAppFile/" + languageId}
          alt=""
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
            <img src="/icons/Other/info-square-fill.svg" alt="Info" />
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

  function BookHeader({ language, languageId, author, date }) {
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
        <Language language={language} languageId={languageId}></Language>
      </div>
    );
  }

  const [genre, setGenre] = useState();
  const [language, setLanguage] = useState();

  useEffect(() => {
    Initialize(setGenre, "Genre", "", book.genreId);
    Initialize(setLanguage, "Language", "", book.languageId);
  }, [book]);

  const filePath =
    // ImageByURL
    "http://localhost:5157/api/Book/GetAppFile/" + book.id;
  let price = book.price;
  let rating = book.rating;
  let title = book.title;
  let author = book.author;
  let publicationYear = book.publicationYear;
  let img = null;
  if (book.imagePlaceHolder != undefined)
    img = URL.createObjectURL(book.imagePlaceHolder);

  let description = book.description;

  function whichImage(img) {
    let src = "";
    if (!book.appFile && !img) src = "./img/not-found.png";
    else src = img ?? filePath;
    return src;
  }

  return (
    <Card
      style={bookStyle}
      border="light"
      data-bs-theme="dark"
      className="d-flex p-2 book"
    >
      <div className="my-cover-container position-relative container-fluid">
        <Rating rating={rating} />
        <Description text={description} />
        <Card.Img className="card-image" src={whichImage(img)} />
        <Genre genre={genre} />
      </div>
      <Card.Body className="d-flex flex-column align-items-center  text-wrap">
        <Card.Title className="w-100">{title}</Card.Title>
        <BookHeader
          language={language}
          languageId={book.languageId}
          author={author}
          date={publicationYear}
        ></BookHeader>
        <Purchase price={price} />
      </Card.Body>
    </Card>
  );
}
