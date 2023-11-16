import React, { useEffect, useState } from "react";
import Navibar from "./Components/Navibar.js";
import BooksList from "./Components/BooksManager.js";
import "./App.css";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import BooksManager from "./Components/BooksManager.js";
import GenresManager from "./Components/SecondaryManager.js";
import SecondaryManager from "./Components/SecondaryManager.js";
export default function AdminPanel() {
  const [curManager, setCurManager] = useState("Books");

  const tabData = {
    Books: () => {
      return <BooksManager />;
    },
    Genres: () => {
      
      return (
        <div>
          <SecondaryManager type="Genre" />
        </div>
      );
    },
    Languages: () => {
      return <SecondaryManager type="Language" />;
    },
    Users: () => {
      return (
        <span>
          <SecondaryManager type="User" />
        </span>
      );
    },
  };

  return (
    <>
      <Navibar />
      <Container className="d-flex w-100">
        <Tabs
          defaultActiveKey="Books"
          id="uncontrolled-tab-example"
          className="mb-3"
          onSelect={(key) => setCurManager(key)}
        >
          <Tab eventKey="Books" title="Менеджер книг"></Tab>
          <Tab eventKey="Genres" title="Менеджер жанров"></Tab>
          <Tab eventKey="Languages" title="Менеджер языков"></Tab>
          <Tab eventKey="Users" title="Менеджер пользователей"></Tab>
        </Tabs>
      </Container>
      <div>{tabData[curManager]()}</div>
    </>
  );
}
