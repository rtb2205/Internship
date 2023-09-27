import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

export default function NaviBar() {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="p-2"
      >
        <Container>
          <Navbar.Brand>LIBRARY</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>Главная</Nav.Link>
              <Nav.Link>О сайте</Nav.Link>
              <Nav.Link>Редактирование книг</Nav.Link>
              <Nav.Link>Добавление книг</Nav.Link>
            </Nav>
            <Nav className="justify-content-sm-between flex-row">
              <Button variant="primary" className="me-2">
                Log In
              </Button>
              <Button variant="primary">Sign Out</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
