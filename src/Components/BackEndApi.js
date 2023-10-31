export async function GetData(dbSetName, id = "", filter = "") {
  if (id === null) return;
  const url =
    "http://localhost:5157/api/" +
    dbSetName +
    (id !== "" ? "/" + id : "") +
    (filter !== "" ? "?" + filter : "");

  if (dbSetName === "Book") {
    let res = await fetch(url).then((data) => data.json());
    let books = res.item1;

    let paginationData = res.item2;
    return { books, paginationData };
  }
  return await fetch(url).then((data) => data.json());
}

export async function UpdateData(params) {
  const dbSetName = params.dbSetName;
  const id = params.id;
  const body = JSON.stringify(params.body);
  if (id === null) return;
  const url =
    "http://localhost:5157/api/" + dbSetName + (id !== "" ? "/" + id : "");
  return await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + JSON.parse(sessionStorage.getItem("AccessToken")),
    },
    body: body,
  }).then((data) => data);
}

export async function AddData(params) {
  const dbSetName = params.dbSetName;
  const body = JSON.stringify(params.body);
  const url = "http://localhost:5157/api/" + dbSetName;
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + JSON.parse(sessionStorage.getItem("AccessToken")),
    },
    body: body,
  }).then((data) => {
    if (dbSetName === "Book") return data.text();

    return data.json();
  });
}

export async function AttachAppFile(params, bookId) {
  if (bookId === null) return;
  const dbSetName = params.dbSetName;
  const body = params.body;
  const url =
    "http://localhost:5157/api/" + dbSetName + "/addApplicationFile/" + bookId;
  return await fetch(url, {
    method: "POST",
    Authorization:
      "Bearer " + JSON.parse(sessionStorage.getItem("AccessToken")),
    body: body,
  }).then((data) => data);
}

export async function DeleteData(params) {
  const dbSetName = params.dbSetName;
  const id = params.id;
  if (id === null) return;
  const url =
    "http://localhost:5157/api/" + dbSetName + (id !== "" ? "/" + id : "");
  return await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer " + JSON.parse(sessionStorage.getItem("AccessToken")),
    },
  }).then((data) => data);
}

export async function Initialize(
  setter = null,
  dbSetName,
  filter = "",
  id = ""
) {
  let pagination;
  let initial;
  if (setter !== null) {
    if (dbSetName === "Book") {
      let data = await GetData(dbSetName, id, filter);
      initial = data.books;
      pagination = data.paginationData;
    } else initial = await GetData(dbSetName, id, filter);
    await setter(initial);
    return pagination;
  }
}
