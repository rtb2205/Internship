import { Form, Button } from "react-bootstrap";
import genres from "./genres.json";
import languages from "./languages.json";
import { useState } from "react";

export default function FilterForm({ filter, setFilter }) {
  function formFieldChangeHandler(event) {
    const { name, value } = event.target;
    setFilter((prevData) => ({ ...prevData, [name]: value, isApplied: false }));
  }

  const genresList = genres.map((item) => {
    return <option>{item.fullname}</option>;
  });
  const languagesList = languages.map((item) => {
    return <option>{item.fullname}</option>;
  });

  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);

  return (
    <Form className="text-light  bg-dark border rounded sticky-top top-10 d-flex flex-column justify-content-around h-75 w-25 p-2">
      <Form.Group className="mb-3">
        <Form.Control
          name="title"
          type="text"
          placeholder="Enter title"
          onChange={formFieldChangeHandler}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Genre</Form.Label>
        <Form.Select name="genre" onChange={formFieldChangeHandler}>
          <option>All</option>
          {genresList}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Rating</Form.Label>
        <div className="d-flex justify-content-between">
          <div className="w-75">
            <Form.Range
              name="rating"
              min="0"
              max="5"
              defaultValue="0"
              onChange={(event) => {
                setRating(event.target.value);
                formFieldChangeHandler(event);
              }}
            ></Form.Range>
            <div className="w-100 d-flex justify-content-between">
              <div>0</div>
              <div>5</div>
            </div>
          </div>
          <Form.Label className="ms-2">{rating}</Form.Label>
        </div>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <div className="d-flex justify-content-between">
          <div className="w-75">
            <Form.Range
              name="price"
              min="0"
              max="100"
              defaultValue="100"
              onChange={(event) => {
                setPrice(event.target.value);
                formFieldChangeHandler(event);
              }}
            ></Form.Range>
            <div className="w-100 d-flex justify-content-between">
              <div>0</div>
              <div>100</div>
            </div>
          </div>
          <Form.Label className="ms-4">{price}</Form.Label>
        </div>
      </Form.Group>
      <Form.Group>
        <Form.Label>Language</Form.Label>
        <Form.Select name="language" onChange={formFieldChangeHandler}>
          <option>All</option>
          {languagesList}
        </Form.Select>
      </Form.Group>
    </Form>
  );
}
