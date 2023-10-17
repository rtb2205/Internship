import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Initialize } from "./BackEndApi";
export default function FilterForm({ filter, setFilter }) {
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  useEffect(() => {
    Initialize(setGenres, "Genre");
    Initialize(setLanguages, "Language");
  }, []);

  function formFieldChangeHandler(event) {
    const { name, value } = event.target;
    setFilter((prevData) => ({ ...prevData, [name]: value, isApplied: false }));
  }

  const genresList = genres.map((item) => {
    return <option value={item.id}> {item.name}</option>;
  });

  const languagesList = languages.map((item) => {
    return <option value={item.id}> {item.name}</option>;
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
        <Form.Select name="genreId" onChange={formFieldChangeHandler}>
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
        <Form.Control
          type="text"
          name="price"
          placeholder="Set max. price"
          onChange={(event) => {
            setPrice(event.target.value);

            formFieldChangeHandler(event);
          }}
        />
        <Form.Text></Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Language</Form.Label>
        <Form.Select name="languageId" onChange={formFieldChangeHandler}>
          <option>All</option>
          {languagesList}
        </Form.Select>
      </Form.Group>
    </Form>
  );
}
