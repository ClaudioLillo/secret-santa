import React from "react";

import "./Books.css";

type BookItem = {
  name: string;
  pages?: number;
  year?: number;
  author?: string;
};

type BookInput = {
  book: BookItem;
};
export default function Book({ book }: BookInput) {
  const authorsYear = `${book.author}(${book.year})`;
  return (
    <div className="book">
      <p className="book-title">{book.name}</p>
      <p className="book-authors-year">{authorsYear}</p>
    </div>
  );
}
