import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AddData, GetToastData } from "./BackEndApi";
import MyToast from "./MyToast";

export default function NaviBar() {
  let navigate = useNavigate();
  const [toastData, setToastData] = useState({
    messageText: "Success!!!",
    variant: "success",
  });

  const [showToast, setShowToast] = useState(true);
  const [userLoginData, setUserLoginData] = useState({
    username: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("AccessToken") != null
  );

  async function handleLogIn() {
    var params = {
      dbSetName: "login",
      body: userLoginData,
    };
    var response = await AddData(params);

    setToastData(GetToastData(response));
    setShowToast(true);

    if (response.AccessToken != undefined && response.AccessToken != null) {
      sessionStorage.setItem("AccessToken", response?.AccessToken);
      setIsLoggedIn(true);
    }
  }

  function handleLogOut() {
    sessionStorage.clear();

    setIsLoggedIn(false);
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
          {
            <MyToast
              setShow={setShowToast}
              show={showToast}
              toastData={toastData}
            />
          }
          <Navbar.Brand>LIBRARY</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Главная</Nav.Link>
              {/* <Nav.Link href="/about">О сайте</Nav.Link> */}
              <div>
                {isLoggedIn && (
                  <Nav.Link href="/adminPanel">
                    Администраторская панель{" "}
                  </Nav.Link>
                )}
              </div>
            </Nav>
            <Nav className="justify-content-sm-between flex-row align-items-center">
              {!isLoggedIn && (
                <>
                  <Form.Control
                    type="username"
                    placeholder="Username..."
                    onChange={(event) => {
                      setUserLoginData({
                        ...userLoginData,
                        username: event.target.value,
                      });
                    }}
                    className="m-2 h-100"
                  />
                  <Form.Control
                    type="password"
                    placeholder="Password..."
                    onChange={(event) => {
                      setUserLoginData({
                        ...userLoginData,
                        password: event.target.value,
                      });
                    }}
                    className="m-2 h-100"
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

              {isLoggedIn && (
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
