import React from "react";

export default function ModalGeneral({ text, variant, body = {}, booksArray }) {
  if (text === "Add") {
    let max = 0;
    for (let i = 0; i < booksArray.length; i++) {
      if (booksArray[i].id > max) max = booksArray[i].id;
    }

    let id = max + 1;
    body = {
      id: id,
      title: "",
      isbn: "",
      title: "",
      author: "",
      publicationYear: "2000",
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
      if (key == "genre" || key == "language") {
        const List = eval(key + "s").map((item) => {
          return <option value={item?.id}> {item?.name}</option>;
        });

        formFields.push(
          <Form.Group className="mb-3">
            <Form.Label>
              {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
            </Form.Label>
            <Form.Select
              name={key}
              value={value}
              onChange={formFieldChangeHandler}
            >
              {List}
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
