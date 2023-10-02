import React, { useState } from "react";
import { Button, Container, Nav, Navbar, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function NaviBar() {
  let navigate = useNavigate();
  const [password, setPassword] = useState("");

  function handleLogIn() {
    if (password === "Adm123!") {
      localStorage.setItem("admin", true);
      navigate("/adminPanel");
    } else {
      navigate("/");
    }
  }

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
              <Nav.Link href="/">Главная</Nav.Link>
              {/* <Nav.Link href="/about">О сайте</Nav.Link> */}
              <Nav.Link href="/adminPanel">Администраторская панель </Nav.Link>
            </Nav>
            <Nav className="justify-content-sm-between flex-row align-items-center">
              <Form.Control
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                className="h-100"
              />
              <Button
                variant="primary"
                className="w-50 ms-2"
                onClick={handleLogIn}
              >
                Log In
              </Button>
              {/* <Button variant="primary">Sign Out</Button> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
