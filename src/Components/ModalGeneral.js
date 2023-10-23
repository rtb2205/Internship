import React, { useEffect, useState, useContext } from "react";
import Book from "./Book";
import { AddData, DeleteData, Initialize, UpdateData } from "./BackEndApi";
import { Button, Form, Modal } from "react-bootstrap";
import { GenresContext, LanguageContext } from "./Contexts";

export default function ModalGeneral({ variant, close, book = {} }) {
  let genres = useContext(GenresContext);
  let languages = useContext(LanguageContext);

  const variantToQueryPair = {
    Add: AddData,
    Remove: DeleteData,
    Edit: UpdateData,
  };
  if (variant === "Add") {
    book = {
      title: "",
      isbn: "",
      author: "",
      publicationYear: "",
      genreId: "",
      languageId: null,
      image: "",
      imageId: "",
      rating: 0,
      price: 0,
      description: "",
    };
  }

  // const [show, setShow] = useState(true);
  const [currentBook, setCurrentBook] = useState(book);

  const handleClose = () => {
    close();
  };

  function formFieldChangeHandler(event) {
    const { name, value } = event.target;
    setCurrentBook((prevData) => ({ ...prevData, [name]: value }));
  }

  const [fieldsWithSelectors, setFieldsWithSelectors] = useState({
    genreId: genres,
    languageId: languages,
  });
  const [toBeIgnoredFields, setToBeIgnoredFields] = useState([
    "genre",
    "language",
    "id",
  ]);
  const [toBeModifiedNames, setToBeModifiedNames] = useState({
    genreId: "Genre",
    languageId: "Language",
    publicationYear: "Publication Year",
  });
  const [selectorFieldsOptions, setselectorFieldsOptions] = useState(() => {
    let result = [];
    for (const [key, value] of Object.entries(fieldsWithSelectors)) {
      let List = [];
      List.push(
        <option key="default" value="" disabled>
          Select {toBeModifiedNames[key]}
        </option>
      );
      List.push(
        value.map((item) => {
          return (
            <option key={item?.id} value={item?.id}>
              {item?.name}
            </option>
          );
        })
      );
      result.push({ key: key, value: List });
    }
    return result;
  });

  let modalBody;
  let handleSubmit = async (modifiedBook, id) => {
    const args = {
      dbSetName: "Book",
      body: modifiedBook,
      id: id,
    };
    debugger;
    await variantToQueryPair[variant](args);
  };

  let formFields = [];
  if (variant !== "Remove") {
    for (const [key, value] of Object.entries(book)) {
      if (toBeIgnoredFields.find((item) => item === key)) continue;
      let fieldWithSelector = fieldsWithSelectors[key];
      let label = toBeModifiedNames[key] ?? key;

      //checking if current field is a list of options
      if (fieldWithSelector !== undefined) {
        formFields.push(
          <Form.Group className="mb-3">
            <Form.Label>
              {label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()}
            </Form.Label>
            <Form.Select
              name={key}
              defaultValue={value ?? ""}
              onChange={formFieldChangeHandler}
            >
              {
                selectorFieldsOptions.find((element) => element.key == key)
                  ?.value
              }
            </Form.Select>
          </Form.Group>
        );
        continue;
      }
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
      if (key === "image") {
        fieldType["type"] = "file";
      }
      formFields.push(
        <Form.Group className="mb-3">
          <Form.Label>
            {label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()}
          </Form.Label>
          <Form.Control
            name={key}
            {...fieldType}
            placeholder={"Enter " + label}
            onChange={formFieldChangeHandler}
            value={currentBook[key]}
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
            onClick={() => {
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
