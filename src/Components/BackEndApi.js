export async function GetData(dbSetName, id = "", filter = "") {
  const url =
    "http://localhost:5157/api/" +
    dbSetName +
    (id !== "" ? "/" + id : "") +
    (filter !== "" ? "?" + filter : "");
  return await fetch(url).then((data) => data.json());
}

export async function UpdateData(dbSetName, id, body) {
  const url =
    "http://localhost:5157/api/" + dbSetName + (id !== "" ? "/" + id : "");
  return await fetch(url, {
    method: "PUT",
    body: body,
  }).then((data) => data.json());
}

export async function AddData(dbSetName, body) {
  const url = "http://localhost:5157/api/" + dbSetName;
  return await fetch(url, {
    method: "POST",
    body: body,
  }).then((data) => data.json());
}

export async function DeleteData(dbSetName, id) {
  const url =
    "http://localhost:5157/api/" + dbSetName + (id !== "" ? "/" + id : "");
  return await fetch(url, {
    method: "DELETE",
  }).then((data) => data.json());
}

export async function Initialize(setter = null, dbSetName, filter = "") {
  if (setter !== null) {
    const initial = await GetData(dbSetName, "", filter);
    setter(initial);
  }
}
