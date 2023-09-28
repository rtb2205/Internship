import React from "react";
import { Badge, Button, Carousel, Container, Modal } from "react-bootstrap";
import books from "./books.json";
import "./Slider.css";
import { useState } from "react";
import { Table } from "react-bootstrap";

function ModalWrapper({ text, variant, body }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (text === "Change") {
    let newBody = (
      <form>
        <input type="text" value={body.title}></input>
        <input type="text">{body.author}</input>
        <input type="text">{body.publicationYear}</input>
        <input type="text">{body.genre}</input>
        <input type="text">{body.language}</input>
        <input type="text">{body.rating}</input>
        <input type="text">{body.price}</input>
        <input type="text">{body.img}</input>
        <input type="text">{body.description}</input>
      </form>
    );
    body = newBody;
  }

  return (
    <>
      <Button className="m-2" variant={variant} onClick={handleShow}>
        {text}
      </Button>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function DataString({ bookData }) {
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
          <ModalWrapper text="Change" variant="primary" body={bookData} />
          <ModalWrapper text="Remove" variant="danger" body="Are you sure?" />
        </div>
      </th>
    </tr>
  );
}

export default function ItemsList() {
  let booksArray = books.slice();
  let mainData = booksArray.map((book) => {
    console.log(book);
    return <DataString bookData={book} key={book.isbn} />;
  });
  // console.log(mainData);
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
  );
}
