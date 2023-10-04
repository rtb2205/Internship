import Book from "./Book";
import React, { useContext } from "react";
import { Container, Pagination } from "react-bootstrap";
import FilterForm from "./FilterForm";
import { useState } from "react";
// import genres from "./genres.json";
// import languages from "./languages.json";
import { BooksContext, GenresContext, LanguageContext } from "./BooksContext";

export default function BookShelf() {
  const bookStyle = { width: "20em", margin: "8px" };
  const booksPerPage = 8;
  const [curPage, setCurPage] = useState(1);
  const books = useContext(BooksContext);
  const maxPrice = Math.ceil(books.sort((a, b) => b.price - a.price)[0].price);
  const [filter, setFilter] = useState({
    title: "",
    price: "100",
    rating: "0",
    genre: "All",
    language: "All",
    isApplied: false,
    maxPrice: maxPrice,
  });

  const genres = useContext(GenresContext);
  const languages = useContext(LanguageContext);

  const [filteredBooks, setFilteredBooks] = useState(books);
  let totalFiltered = filteredBooks.length;

  function applyFilter(item) {
    console.log("Filter is " + item.language);
    if (
      item.title.toLowerCase().startsWith(filter.title.toLowerCase()) &&
      (item.price <= filter.price || item.usePrice === "off") &&
      (item.rating >= filter.rating || item.useRating === "on") &&
      (item.genre === filter.genre || filter.genre === "All") &&
      (item.language === filter.language || filter.language === "All")
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
