export async function RefTypeToString(id, jsonName) {
  jsonName = "./" + jsonName + ".json";

  const response = await fetch(jsonName);
  const data = await response.json();
  const foundObject = data.find((item) => item.id === id);

  if (foundObject) {
    return foundObject.fullname;
  }
}

export function DefaultBook() {
  return {
    id: "",
    title: "",
    author: "",
    publication_year: 0,
    isbn: "",
    genre: 0,
    language: "",
    rating: 0,
    price: 0,
    img: "",
    description: "",
  };
}

export function DefaultGenre() {
  return {
    id: "",
    fullname: "",
  };
}

export function DefaultLanguage() {
  return {
    id: "",
    img: "",
    fullname: "",
  };
}
