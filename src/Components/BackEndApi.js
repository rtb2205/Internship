export async function GetData(dbSetName, id = "") {
  const url =
    "http://localhost:5157/api/" + dbSetName + (id !== "" ? "/" + id : "");
  const fetchData = await fetch(url);
  const data = await fetchData.json();
  return data;
}
