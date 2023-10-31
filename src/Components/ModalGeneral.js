import React, { useState, useContext, useRef } from "react";
import Book from "./Book";
import { AddData, DeleteData, AttachAppFile, UpdateData } from "./BackEndApi";
import { Button, Form, Modal } from "react-bootstrap";
import { GenresContext, LanguageContext } from "./Contexts";

export default function ModalGeneral({ variant, close, book = {} }) {
  let genres = useContext(GenresContext);
  let languages = useContext(LanguageContext);
  //позже поменять
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  //позже поменятьs

  const variantToQueryPair = {
    Add: async (params) => {
      var id = await AddData(params);
      if (fileInputRef.current?.files[0] != undefined) {
        const formData = new FormData();

        formData.append("file", fileInputRef.current.files[0]);
        params.body = formData;
        await AttachAppFile(params, id);
      }
    },
    Remove: DeleteData,
    Edit: async (params) => {
      await UpdateData(params);
      if (fileInputRef.current?.files[0] != undefined) {
        const formData = new FormData();
        formData.append("file", fileInputRef.current.files[0]);
        console.log(fileInputRef.current.files[0]);
        params.body = formData;
        await AttachAppFile(params, params.id);
      } else if (currentBook.appFile != null) {
        const formData = new FormData();
        var curImage = "http://localhost:5157/bookGetFile/" + currentBook.id;
        formData.append("file", curImage);
        params.body = formData;
        await AttachAppFile(params, params.id);
      }
    },
  };

  if (variant === "Add") {
    book = {
      id: "",
      title: "",
      isbn: "",
      author: "",
      publicationYear: "",
      genreId: null,
      languageId: null,
      appFile: null,
      // imageId: "",
      rating: 0,
      price: 0,
      description: "",
    };
  }
  const [currentBook, setCurrentBook] = useState(book);
  console.log("CurBook >>> ", currentBook);
  const handleClose = () => {
    close();
  };
  function formFieldChangeHandler(event) {
    const { name, value } = event.target;
    if (name === "cover") {
      return;
    }
    setCurrentBook((prevData) => ({ ...prevData, [name]: value }));
  }

  let modalBody;

  let handleSubmit = async (modifiedBook, id) => {
    const args = {
      dbSetName: "Book",
      body: modifiedBook,
      id: id,
    };
    await variantToQueryPair[variant](args);
  };

  if (variant !== "Remove") {
    const formFields = (
      <Form className="w-100 flex-grow-1">
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            onChange={formFieldChangeHandler}
            defaultValue={currentBook.title}
          />
        </Form.Group>

        <Form.Group controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            name="author"
            onChange={formFieldChangeHandler}
            defaultValue={currentBook.author}
          />
        </Form.Group>

        <Form.Group controlId="isbn">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            name="isbn"
            onChange={formFieldChangeHandler}
            defaultValue={currentBook.isbn}
          />
        </Form.Group>

        <Form.Group controlId="publicationYear">
          <Form.Label>Publication year</Form.Label>
          <Form.Control
            type="number"
            name="publicationYear"
            onChange={formFieldChangeHandler}
            defaultValue={currentBook.publicationYear}
          />
        </Form.Group>

        <Form.Group controlId="genres">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            as="select"
            name="genreId"
            onChange={formFieldChangeHandler}
            defaultValue={currentBook.genreId ?? "default"}
          >
            <option value="default" disabled>
              Select genre
            </option>
            {genres.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="languages">
          <Form.Label>Language</Form.Label>
          <Form.Control
            as="select"
            name="languageId"
            onChange={formFieldChangeHandler}
            defaultValue={currentBook.languageId ?? "default"}
          >
            <option value="default" disabled>
              Select language
            </option>
            {languages.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="cover">
          <Form.Label>Cover</Form.Label>
          <>
            {!currentBook.appFile && (
              <Form.Control
                type="file"
                name="cover"
                ref={fileInputRef}
                onChange={formFieldChangeHandler}
                placeholder="Select cover picture"
              />
            )}
            {currentBook.appFile && (
              <div className="d-flex">
                <Form.Control
                  type="text"
                  name="cover"
                  disabled
                  placeholder={currentBook.appFile?.name}
                />
                <Button
                  variant="danger"
                  onClick={() => {
                    setCurrentBook({ ...currentBook, appFile: null });
                  }}
                >
                  X
                </Button>
              </div>
            )}
          </>
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            onChange={formFieldChangeHandler}
            value={currentBook.price}
          />
        </Form.Group>

        <Form.Group controlId="rating">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="number"
            name="rating"
            onChange={formFieldChangeHandler}
            value={currentBook.rating}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows={3}
            onChange={formFieldChangeHandler}
            defaultValue={currentBook.description}
          />
        </Form.Group>
      </Form>
    );
    const bookStyle = { position: "fixed", right: "2%", top: "4%" };
    modalBody = (
      <Modal.Body className="d-flex">
        {formFields}
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
      <Modal
        size="lg"
        show={true}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>{variant} book</Modal.Title>
        </Modal.Header>
        {modalBody}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              handleSubmit(currentBook, book?.id).then(() => handleClose());
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
