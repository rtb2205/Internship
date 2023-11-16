import React from "react";

export function DateToLocale(date) {
  date = new Date(date);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Для 24-часового формата времени
    timeZone: "Asia/Baku", // Установка временной зоны для Баку
  };
  const formattedDate = date.toLocaleDateString(options);

  const formattedTime = date.toLocaleTimeString(options);

  const formattedDateTime = formattedDate + " " + formattedTime;
  return formattedDateTime;
}
