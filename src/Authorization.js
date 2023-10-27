import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

export default function Authorization() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      {isLogin && (
        <Container
          style={{ height: "100vh" }}
          className="w-100 p-2 d-flex flex-column align-items-center justify-content-center text-center"
        >
          <Form className="w-50">
            <Form.Group className="m-2" controlId="username">
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
              />
            </Form.Group>
            <Form.Group className="m-2" controlId="password">
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
              />
            </Form.Group>
            <Button className="m-2" variant="primary">
              Log In
            </Button>
            <Button
              className="m-2"
              variant=""
              onClick={() => setIsLogin(false)}
            >
              Don't gave an account yet
            </Button>
          </Form>
        </Container>
      )}

      {!isLogin && (
        <Container
          style={{ height: "100vh" }}
          className="w-100 p-2 d-flex flex-column align-items-center justify-content-center text-center"
        >
          <Form className="w-50">
            <Form.Group className="m-2" controlId="username">
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
              />
            </Form.Group>
            <Form.Group className="m-2" controlId="password">
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
              />
            </Form.Group>
            <Form.Group className="m-2" controlId="passwordRepeat">
              <Form.Control
                type="password"
                name="password"
                placeholder="Repeat the password"
              />
            </Form.Group>
            <Form.Group className="m-2" controlId="passwordRepeat">
              <Form.Switch name="isAdmin" />
            </Form.Group>
            <Button disabled className="m-2" variant="primary">
              Sign up
            </Button>
            <Button className="m-2" variant="" onClick={() => setIsLogin(true)}>
              Already have an account
            </Button>
          </Form>
        </Container>
      )}
    </>
  );
}
