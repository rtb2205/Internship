export async function RefTypeToString(id, jsonName) {
  jsonName = "./" + jsonName + ".json";

  const response = await fetch(jsonName);
  const data = await response.json();
  const foundObject = data.find((item) => item.id === id);

  if (foundObject) {
    return foundObject.fullname;
  }
}
