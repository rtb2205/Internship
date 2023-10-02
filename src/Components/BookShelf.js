import Book from "./Book";
import React from "react";
import { Container, Pagination } from "react-bootstrap";
import books from "./books.json";
import FilterForm from "./FilterForm";
import { useState } from "react";
import genres from "./genres.json";
import languages from "./languages.json";

export default function BookShelf() {
  const bookStyle = { width: "20em", margin: "8px" };
  const booksPerPage = 8;
  const [curPage, setCurPage] = useState(1);
  const [filter, setFilter] = useState({
    title: "",
    price: "100",
    rating: "0",
    genre: "All",
    language: "All",
    isApplied: false,
  });

  const [filteredBooks, setFilteredBooks] = useState(books);
  let totalFiltered = filteredBooks.length;
  function applyFilter(item) {
    console.log(item.price <= filter.price || filter.price == 0);
    if (
      item.title.toLowerCase().startsWith(filter.title.toLowerCase()) &&
      item.price <= filter.price &&
      item.rating >= filter.rating &&
      (genres.find((el) => el.id == item.genre).name === filter.genre ||
        filter.genre === "All") &&
      (languages.find((el) => el.code == item.language).fullname ===
        filter.language ||
        filter.language === "All")
    )
      return true;
    return false;
  }

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

  if (!filter.isApplied) {
    console.log("Hello");
    setFilteredBooks(books.filter((item) => applyFilter(item)));
    setFilter((prevValue) => ({ ...prevValue, isApplied: true }));
    setCurPage(1);
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
    return <Book book={item} bookStyle={bookStyle} />;
  });
  return (
    <Container fluid className="d-flex">
      <FilterForm filter={filter} setFilter={setFilter} />
      <div className="d-flex flex-column align-items-center w-75">
        <Container fluid className="d-flex flex-wrap justify-content-center">
          {visibleBooks}
        </Container>
        <Pagination>{items}</Pagination>
      </div>
    </Container>
  );
}
