import React, { useEffect } from "react";
import "./Slider.css";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Initialize } from "./BackEndApi";
import ModalGeneral from "./ModalGeneral";
import { GenresContext, LanguageContext } from "./Contexts";

export default function BooksList() {
  const [languages, setLanguages] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    Initialize(setLanguages, "Language");
    Initialize(setGenres, "Genre");
  }, []);

  const [booksArray, setBooksArray] = useState([]);
  const [refreshed, setRefreshed] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [variant, setVariant] = useState("Add");
  const [book, setBook] = useState({});

  function openModal(variant, book = {}) {
    if (book != null) setBook(book);
    setVariant(variant);
    setIsModalOpen(true);
  }

  useEffect(() => {
    if (refreshed) return;
    Initialize(setBooksArray, "Book").then(() => setRefreshed(true));
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
          <img style={{ width: "100%" }} alt="" src={bookData.image?.url}></img>
        </td>
        <td>{bookData.description}</td>
        <td>
          <div className="d-flex justify-content-between"></div>
          <Button
            className="m-2"
            variant="secondary"
            onClick={() => {
              openModal("Edit", bookData);
            }}
          >
            Edit
          </Button>
          <Button
            className="m-2"
            variant="danger"
            onClick={() => {
              openModal("Remove", bookData);
            }}
          >
            Remove
          </Button>
        </td>
      </tr>
    );
  }

  let mainData = booksArray.map((book) => {
    return (
      <DataString
        bookData={book}
        key={book.id}
        setBooksArray={setBooksArray}
        booksArray={booksArray}
      />
    );
  });

  // debugger;
  if (!refreshed) return <></>;
  else
    return (
      <>
        <div className="d-flex flex-column align-items-center">
          <Button
            onClick={() => {
              openModal("Add");
            }}
          >
            Add
          </Button>
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
                <th style={{ width: "12%" }}>Manage</th>
              </tr>
            </thead>
            <tbody>{mainData}</tbody>
          </Table>
        </div>
        {isModalOpen && (
          <GenresContext.Provider value={genres}>
            <LanguageContext.Provider value={languages}>
              <ModalGeneral
                variant={variant}
                book={book}
                close={() => {
                  setIsModalOpen(false);
                  setRefreshed(false);
                }}
              />
            </LanguageContext.Provider>
          </GenresContext.Provider>
        )}
      </>
    );
}
