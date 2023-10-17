import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NaviBar() {
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("admin") === "true"
  );

  function handleLogIn() {
    if (password === "Adm123!") {
      localStorage.setItem("admin", true);
      setIsAdmin(true);
    }
  }
  

  function handleLogOut() {
    localStorage.setItem("admin", false);
    setIsAdmin(false);
    navigate("/");
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
              <div>
                {isAdmin && (
                  <Nav.Link href="/adminPanel">
                    Администраторская панель{" "}
                  </Nav.Link>
                )}
              </div>
            </Nav>
            <Nav className="justify-content-sm-between flex-row align-items-center">
              {!isAdmin && (
                <>
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
                </>
              )}

              {isAdmin && (
                <Button
                  variant="primary"
                  className="w-100 ms-2"
                  onClick={handleLogOut}
                >
                  Sign Out
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
