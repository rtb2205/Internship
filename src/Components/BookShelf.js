import Book from "./Book";
import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import FilterForm from "./FilterForm";
import { useState } from "react";
import { Initialize } from "./BackEndApi";
import "./MyPagination.css";

export default function BookShelf() {
  // const [booksPerPage, setBooksPerPage] = useState(1);
  const [pagesAmount, setPagesAmount] = useState(1);
  const [filteredBooks, setFilteredBooks] = useState([]);
  // const [curPage, setCurPage] = useState(1);
  const [filter, setFilter] = useState({
    title: "",
    price: "",
    rating: "0",
    genreId: "All",
    languageId: "All",
    isApplied: false,
    currentPage: 1,
    booksPerPage: 4,
  });

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
    let paginationData = Initialize(setFilteredBooks, "Book", paramString).then(
      (res) => {
        setPagesAmount(res.pagesAmount);
        setFilter((prevValue) => ({
          ...prevValue,
          booksPerPage: res.booksPerPage,
          currentPage: res.currentPage,
          isApplied: true,
        }));
      }
    );
  }, [filter.isApplied]);

  let visibleBooks = filteredBooks.map((item) => {
    return (
      <div className="m-2">
        <Book key={item.Id} book={item} />;
      </div>
    );
  });

  function handlePageClick(selected) {
    let number = selected.selected + 1;
    setFilter({ ...filter, isApplied: false, currentPage: number });
  }

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
        <>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pagesAmount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName="pagination-container"
            pageLinkClassName="page-item"
            previousLinkClassName="page-item"
            breakLabel="..."
            breakClassName="break-item"
            nextLinkClassName="page-item"
            activeLinkClassName="page-active"
          />
        </>
      </div>
    </Container>
  );
}
