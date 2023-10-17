import React, { useContext, useEffect } from "react";
import "./Slider.css";
import { useState } from "react";
import { Table, Form } from "react-bootstrap";
import { Initialize } from "./BackEndApi";
import ModalGeneral from "./ModalGeneral";

export default function BooksList() {
  const [booksArray, setBooksArray] = useState([]);
  const [refreshed, setRefreshed] = useState(false);

  useEffect(() => {
    if (refreshed) return;
    Initialize(setBooksArray, "Book");
    setRefreshed(true);
  }, [refreshed]);

  function DataString({ bookData }) {
    return (
      <tr>
        <td>{bookData.isbn}</td>
        <td>{bookData.title}</td>
        <td>{bookData.author}</td>
        <td>{bookData.publicationYear}</td>
        <td>{bookData.genre.name}</td>
        <td>{bookData.language.name}</td>
        <td>{bookData.rating}</td>
        <td>{bookData.price}</td>
        <td>
          <img style={{ width: "100%" }} src={bookData.image}></img>
        </td>
        <td>{bookData.description}</td>
        <td>
          <div className="d-flex justify-content-between"></div>
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
        </td>
      </tr>
    );
  }

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

  if (!refreshed) return <></>;
  else
    return (
      <div className="d-flex flex-column align-items-center">
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
