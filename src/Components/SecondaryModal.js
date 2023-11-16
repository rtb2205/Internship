import React, { useState, useContext, useRef } from "react";
import Book from "./Book";
import { AddData, AttachAppFile, DeleteData, UpdateData } from "./BackEndApi";
import { Button, Form, Modal } from "react-bootstrap";

export default function SecondaryModal({
  type = "Genre",
  variant,
  close,
  item = {},
}) {
  const fileInputRef = useRef(null);
  const columns = {
    Genre: {
      name: "name",
    },
    Language: {
      name: "name",
      appFile: "cover",
    },
    User: {
      name: "username",
      role: "role",
    },
  };

  if (variant == "Add") {
    item = { name: "" };
  }
  const [curItem, setCurItem] = useState(item);

  function formFieldChangeHandler(event) {
    const { name, value } = event.target;
    if (name === "cover") {
      return;
    }
    setCurItem((prevData) => ({ ...prevData, [name]: value }));
  }

  let AttachApplicationFile = async (params, id) => {
    if (fileInputRef.current?.files[0] != undefined) {
      const formData = new FormData();
      formData.append("file", fileInputRef.current.files[0]);
      params.body = formData;
      await AttachAppFile(params, id);
    }
  };
  const handleClose = () => close();
  let modalBody;
  let handleSubmit = async () => {
    let item = curItem;
    let id = item?.id;
    let response;
    if (variant === "Remove") {
      let params = { dbSetName: type, id: id };
      response = await DeleteData(params);
    }
    if (variant === "Add") {
      let params = { dbSetName: type, body: curItem };
      let response = await AddData(params);

      let id = response.result;
      if (type == "Language")
        response = await AttachApplicationFile(params, id);
    }
    if (variant === "Edit") {
      let params = { dbSetName: type, body: curItem, id: id };
      await UpdateData(params);
      await AttachApplicationFile(params, params.id);
    }
  };
  if (variant === "Remove")
    modalBody = (
      <Modal.Body className="d-flex justify-content-center">
        <h4>Are you sure?</h4>
      </Modal.Body>
    );
  else {
    modalBody = (
      <Form>
        <Form.Group className="m-2 d-flex align-items-center">
          <Form.Label className="m-2">Name</Form.Label>
          <Form.Control
            onChange={formFieldChangeHandler}
            type="text"
            name={columns[type].name}
            defaultValue={item[columns[type].name]}
          />
        </Form.Group>
        {type === "Language" && (
          <Form.Group controlId="cover" className="d-flex m-2">
            <Form.Label className="m-2">Cover</Form.Label>
            <>
              {!curItem.appFile && (
                <Form.Control
                  type="file"
                  name="cover"
                  ref={fileInputRef}
                  onChange={formFieldChangeHandler}
                  placeholder="Select cover picture"
                />
              )}
              {curItem.appFile && (
                <div className="d-flex">
                  <Form.Control
                    type="text"
                    name="cover"
                    disabled
                    placeholder={curItem.appFile?.name}
                  />
                  <Button
                    variant="danger"
                    onClick={() => {
                      setCurItem({
                        ...curItem,
                        appFile: null,
                        appFileId: null,
                      });
                    }}
                  >
                    X
                  </Button>
                </div>
              )}
            </>
          </Form.Group>
        )}
        {type === "User" && (
          <Form.Group
            className="m-2 d-flex align-items-center"
            controlId="genres"
          >
            <Form.Label>Role</Form.Label>
            <Form.Control
              className="m-2"
              as="select"
              name="role"
              onChange={formFieldChangeHandler}
              defaultValue={curItem.role ?? "default"}
            >
              <option value="default" disabled>
                Select role
              </option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </Form.Control>
          </Form.Group>
        )}
        {type === "User" && variant == "Add" && (
          <Form.Group className="m-2 d-flex align-items-center">
            <Form.Label className="m-2">Password</Form.Label>
            <Form.Control
              onChange={formFieldChangeHandler}
              name="password"
              type="text"
              defaultChecked={curItem.role === "Admin"}
            />
          </Form.Group>
        )}
      </Form>
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
          <Modal.Title>{variant}</Modal.Title>
        </Modal.Header>
        {modalBody}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              await handleSubmit();
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
