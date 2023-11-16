import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Toast, ToastContainer, Button } from "react-bootstrap";

export default function MyToast({
  show = true,
  setShow,
  className = "",
  toastData = { messageText: "Success!!!", variant: "danger" },
}) {
  console.log("MyToastData >>> ", toastData);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [show]);

  className = className + "position-fixed w-100";
  let style = { zIndex: 100 };
  return (
    <>
      <div
        aria-live="polite"
        aria-atomic="true"
        className={className}
        style={style}
      >
        <ToastContainer
          className="p-3"
          position="top-center"
          style={{ zIndex: 1 }}
        >
          <Toast
            bg={toastData.variant}
            show={show}
            onClose={() => setShow(false)}
          >
            <Toast.Header closeButton={true}>
              <strong className="me-auto">Message</strong>
            </Toast.Header>
            <Toast.Body>{toastData.messageText}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </>
  );
}
