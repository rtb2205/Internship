export async function GetData(dbSetName, id = "", filter = "") {
  const url =
    "http://localhost:5157/api/" +
    dbSetName +
    (id !== "" ? "/" + id : "") +
    (filter !== "" ? "?" + filter : "");
  return await fetch(url).then((data) => data.json());
}

export async function UpdateData(params) {
  const dbSetName = params.dbSetName;
  const id = params.id;
  const body = JSON.stringify(params.body);

  const url =
    "http://localhost:5157/api/" + dbSetName + (id !== "" ? "/" + id : "");
  return await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  }).then((data) => data.json());
}

export async function AddData(params) {
  const dbSetName = params.dbSetName;
  const body = JSON.stringify(params.body);

  const url = "http://localhost:5157/api/" + dbSetName;
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  }).then((data) => data.json());
}

export async function DeleteData(params) {
  const dbSetName = params.dbSetName;
  const id = params.id;
  const url =
    "http://localhost:5157/api/" + dbSetName + (id !== "" ? "/" + id : "");
  return await fetch(url, {
    method: "DELETE",
  }).then((data) => data.json());
}

export async function Initialize(
  setter = null,
  dbSetName,
  filter = "",
  id = ""
) {
  if (setter !== null) {
    const initial = await GetData(dbSetName, id, filter);
    setter(initial);
  }
}
