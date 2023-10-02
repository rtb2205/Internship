import React from "react";
import { Badge, Button, Carousel, Container, Modal } from "react-bootstrap";
import books from "./books.json";
import "./Slider.css";
import { useState } from "react";
import { Table, Form } from "react-bootstrap";
import Book from "./Book";
import { type } from "@testing-library/user-event/dist/type";

function ModalGeneral({ text, variant, body, setBooksArray, booksArray }) {
  let handleSubmit;

  if (text == "Add") {
    body = {
      id: 0,
      title: "",
      isbn: "",
      title: "",
      author: "",
      publicationYear: "",
      genre: "",
      language: "",
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
  console.log(booksArray);

  if (text != "Remove") {
    handleSubmit = (modifiedBook) => {
      const indexToUpdate = booksArray.findIndex(
        (book) => book.id === modifiedBook.id
      );
      const updatedBooksArray = [...booksArray];
      updatedBooksArray[indexToUpdate] = modifiedBook;
      setBooksArray(updatedBooksArray);
    };

    for (const [key, value] of Object.entries(currentBook)) {
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
    handleSubmit = (modifiedBook) => {
      const indexToUpdate = booksArray.findIndex(
        (book) => book.id === modifiedBook.id
      );

      console.log(modifiedBook);
      const updatedBooksArray = [...booksArray];
      updatedBooksArray.splice(indexToUpdate, 1);
      setBooksArray(updatedBooksArray);
    };
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
      <th>{bookData.publicationYear}</th>
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
  const [booksArray, setBooksArray] = useState(books);

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
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>ID</th>
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
    // </div>
  );
}
