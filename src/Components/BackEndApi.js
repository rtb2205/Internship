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
      Authorization: "Bearer " + sessionStorage.getItem("AccessToken"),
    },
    body: body,
  });
}

export async function AddData(params) {
  const dbSetName = params.dbSetName;
  const body = JSON.stringify(params.body);
  const url = "http://localhost:5157/api/" + dbSetName;
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("AccessToken"),
    },
    body: body,
  });

  let data = await response.json();
  data.responseStatusText = response.statusText;
  data.responseStatus = response.status;
  return data;
}

export async function AttachAppFile(params, ownerId) {
  if (ownerId === null) return;
  const dbSetName = params.dbSetName;
  const body = params.body;
  const url =
    "http://localhost:5157/api/" + dbSetName + "/AttachAppFile/" + ownerId;
  return await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("AccessToken"),
    },
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
      Authorization: "Bearer " + sessionStorage.getItem("AccessToken"),
    },
  });
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

export function GetToastData(data) {
  let result;
  const regexError = /^[4-5]0\d$/;
  const regexSuccess = /^2\d{2}$/;
  const statusCode = data.responseStatus;
  const isMatchError = regexError.test(statusCode);
  const isMatchSuccess = regexSuccess.test(statusCode);
  const statusText = data.responseStatusText;

  console.log("GetToastData >>> ", data);
  let messageText = "";
  if (data.errors)
    for (const [key, value] of Object.entries(data.errors)) {
      messageText += " " + value;
    }

  result = {
    variant: isMatchError ? "danger" : isMatchSuccess ? "success" : "warning",
    messageText:
      statusText.toLowerCase() == "ok"
        ? "Success!!!"
        : messageText ?? statusText,
  };

  return result;
}
