import Book from "./Book";
import React, { useContext, useEffect } from "react";
import { Container, Pagination } from "react-bootstrap";
import FilterForm from "./FilterForm";
import { useState } from "react";
import { Initialize } from "./BackEndApi";

export default function BookShelf() {
  const booksPerPage = 8;
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [filter, setFilter] = useState({
    title: "",
    price: "",
    rating: "0",
    genreId: "All",
    languageId: "All",
    isApplied: false,
  });

  let totalFiltered = filteredBooks.length;

  useEffect(() => {
    if (filter.isApplied) return;
    let paramString = "";
    for (const key in filter) {
      if (filter.hasOwnProperty(key)) {
        let filterValue = filter[key];
        if (filterValue == "All") filterValue = "";
        paramString += `&${key}=${filterValue}`;
      }
    }
    paramString = paramString.slice(1);
    Initialize(setFilteredBooks,"Book", paramString);
    setFilter((prevValue) => ({ ...prevValue, isApplied: true }));
    setCurPage(1);
  }, [filter.isApplied]);

  function slicedBooks() {
    let bookAmount = filteredBooks.length;
    let shelfBooks = [];

    let start = (curPage - 1) * 8;
    let end = Math.min(start + 7, bookAmount - 1);

    for (let i = start; i <= end; i++) {
      shelfBooks.push(filteredBooks[i]);
    }

    return shelfBooks;
  }

  let items = [];

  function handlePageClick(number) {
    setCurPage(number);
    visibleBooks.slice((curPage - 1) * booksPerPage, curPage * booksPerPage);
  }

  for (
    let number = 1;
    number <= Math.ceil(totalFiltered / booksPerPage);
    number++
  ) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === curPage}
        onClick={() => handlePageClick(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  let visibleBooks = slicedBooks();
  visibleBooks = visibleBooks.map((item) => {
    return <Book key={item.Id} book={item} />;
  });
  return (
    <Container fluid className="d-flex">
      <FilterForm filter={filter} setFilter={setFilter} />
      <div className="d-flex flex-column align-items-center w-75">
        <Container
          fluid
          className="d-flex flex-wrap justify-content-center m-2 "
        >
          {visibleBooks}
        </Container>
        <Pagination className="m-2"> {items}</Pagination>
      </div>
    </Container>
  );
}
