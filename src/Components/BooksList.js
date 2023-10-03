import React, { useContext } from "react";
import { Badge, Button, Carousel, Container, Modal } from "react-bootstrap";
import "./Slider.css";
import { useState } from "react";
import { Table, Form } from "react-bootstrap";
import Book from "./Book";
import { type } from "@testing-library/user-event/dist/type";
import { RefTypeToString } from "./CommonFunctions.js";
import { BooksContext, BooksDispatchContext } from "./BooksContext";

function ModalGeneral({ text, variant, body = {}, setBooksArray, booksArray }) {
  const dispatch = useContext(BooksDispatchContext);
  if (text == "Add") {
    let max = 0;
    for (let i = 0; i < booksArray.length; i++) {
      if (booksArray[i].id > max) max = booksArray[i].id;
      console.log(booksArray[i].id);
      console.log("max = " + max);
    }

    let id = max + 1;
    body = {
      id: id,
      title: "",
      isbn: "",
      title: "",
      author: "",
      publication_year: "2000",
      genre: "1",
      language: "az",
      rating: "",
      price: 0,
    };
  }

  const [show, setShow] = useState(false);
  const [currentBook, setCurrentBook] = useState(body);

  const handleClose = () => {
    setShow(false);
    setCurrentBook(body);
  };

  const handleShow = () => setShow(true);

  function formFieldChangeHandler(event) {
    const { name, value } = event.target;
    setCurrentBook((prevData) => ({ ...prevData, [name]: value }));
  }

  let formFields = [];
  let modalBody;
  let handleType = "added";

  switch (text) {
    case "Remove": {
      handleType = "deleted";
      break;
    }
    case "Add": {
      handleType = "added";
      break;
    }
    case "Change": {
      handleType = "changed";
      break;
    }
  }

  let handleSubmit = (modifiedBook) => {
    dispatch({
      type: handleType,
      book: modifiedBook,
    });
  };
  if (text != "Remove") {
    for (const [key, value] of Object.entries(currentBook)) {
      if (key == "genre" || key == "language") continue;
      let fieldType = {
        type: "text",
      };
      if (typeof value === "number") {
        fieldType["type"] = "number";
      } else if (typeof value === "boolean") {
        fieldType["type"] = "checkbox";
      }

      if (key === "description")
        fieldType = {
          as: "textarea",
        };
      formFields.push(
        <Form.Group className="mb-3">
          <Form.Label>
            {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
          </Form.Label>
          <Form.Control
            name={key}
            {...fieldType}
            placeholder={"Enter " + key}
            onChange={formFieldChangeHandler}
            value={value}
          />
        </Form.Group>
      );
    }

    const bookStyle = { position: "fixed", right: "2%", top: "4%" };

    modalBody = (
      <Modal.Body className="d-flex">
        <Form className="w-100 flex-grow-1">{formFields}</Form>
        <Book book={currentBook} bookStyle={bookStyle} />
      </Modal.Body>
    );
  } else {
    modalBody = (
      <Modal.Body className="d-flex justify-content-center">
        <h4>Are you sure?</h4>
      </Modal.Body>
    );
  }

  return (
    <>
      <Button className="m-2" variant={variant} onClick={handleShow}>
        {text}
      </Button>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>{text} book</Modal.Title>
        </Modal.Header>
        {modalBody}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit(currentBook);
              handleClose();
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function DataString({ bookData, setBooksArray, booksArray }) {
  return (
    <tr>
      <th>{bookData.isbn}</th>
      <th>{bookData.title}</th>
      <th>{bookData.author}</th>
      <th>{bookData.publication_year}</th>
      <th>{bookData.genre}</th>
      <th>{bookData.language}</th>
      <th>{bookData.rating}</th>
      <th>{bookData.price}</th>
      <th>
        <img style={{ width: "100%" }} src={bookData.img}></img>
      </th>
      <th>{bookData.description}</th>
      <th>
        <div className="d-flex justify-content-between">
          <ModalGeneral
            text="Change"
            variant="primary"
            body={bookData}
            setBooksArray={setBooksArray}
            booksArray={booksArray}
          />
          <ModalGeneral
            text="Remove"
            variant="danger"
            body={bookData}
            setBooksArray={setBooksArray}
            booksArray={booksArray}
          />
        </div>
      </th>
    </tr>
  );
}

export default function BooksList() {
  const booksArray = useContext(BooksContext);
  const setBooksArray = useContext(BooksDispatchContext);

  let mainData = booksArray.map((book) => {
    return (
      <DataString
        bookData={book}
        key={book.isbn}
        setBooksArray={setBooksArray}
        booksArray={booksArray}
      />
    );
  });
  return (
    <div className="d-flex flex-column align-items-center">
      <ModalGeneral
        text="Add"
        variant="success"
        // body={book}
        setBooksArray={setBooksArray}
        booksArray={booksArray}
      />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Isbn</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publication year</th>
            <th>Genre</th>
            <th>Language</th>
            <th>Rating</th>
            <th>Price</th>
            <th>Image</th>
            <th>Description</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>{mainData}</tbody>
      </Table>
    </div>
  );
}
