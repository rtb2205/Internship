import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { Initialize, DeleteData } from "./BackEndApi";
import SecondaryModal from "./SecondaryModal";
import { DateToLocale } from "./Helper";

export default function SecondaryManager({ type }) {
  const columns = {
    Genre: {
      name: "name",
    },
    Language: {
      name: "name",
      appFile: "appFile",
    },
    User: {
      name: "username",
      role: "role",
    },
  };
  const objectType = type;
  const [items, setItems] = useState([]);
  const [curItem, setCurItem] = useState();
  const [curVariant, setCurVariant] = useState("Add");
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal(variant, item = {}) {
    if (item != null) setCurItem(item);
    setCurVariant(variant);
    setIsModalOpen(true);
  }

  const [refreshed, setRefreshed] = useState(false);
  useEffect(() => {
    if (refreshed) return;
    Initialize(setItems, objectType).then(setRefreshed(true));
  }, [refreshed]);

  return (
    <>
      {refreshed && (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Created by</th>
              <th>Creation date</th>
              <th>Last modified by</th>
              <th>Last modification date</th>
              <th>Name</th>
              {objectType == "User" && <th>Role</th>}
              <th style={{ width: "17%" }}>
                <div className="d-flex align-items-center justify-content-between">
                  Manage
                  <Button
                    className="position-fixed"
                    style={{ right: "1%" }}
                    onClick={() => {
                      openModal("Add");
                    }}
                  >
                    +
                  </Button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((el) => {
              return (
                <tr key={el.id}>
                  <td>{el.createdBy}</td>
                  <td>{DateToLocale(el.creationDate)}</td>
                  <td>{el.modifiedBy}</td>
                  <td>{DateToLocale(el.modificationDate)}</td>
                  <td>{el[columns[objectType].name]}</td>
                  {objectType == "User" && (
                    <td>{el[columns[objectType].role]}</td>
                  )}
                  <td>
                    {" "}
                    <div>
                      <Button
                        className="m-2"
                        variant="secondary"
                        onClick={() => {
                          openModal("Edit", el);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        className="m-2"
                        variant="danger"
                        onClick={() => {
                          openModal("Remove", el);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      {isModalOpen && (
        <SecondaryModal
          type={objectType}
          variant={curVariant}
          item={curItem}
          close={() => {
            setIsModalOpen(false);
            setRefreshed(false);
          }}
        />
      )}
    </>
  );
}
