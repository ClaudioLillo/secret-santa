import React, { useState } from "react";

import "./Books.css";
import Header from "../header/Header";
import Book from "./Book";
import { Space } from "antd";
import Search from "antd/es/input/Search";

type BookItem = {
  name: string;
  pages?: number;
  year?: number;
  author?: string;
  editorial?: string;
  edition?: number;
  isbn?: string;
};

const books: BookItem[] = [
  {
    name: "Getting Started with Kubernetes",
    author: "Jonathan Baier",
    year: 2015,
    editorial: "Packt",
    isbn: "978-1-78439-403-5",
  },
  {
    name: "Learning JavaScript Design Patterns",
    author: "Addy Osmani",
    year: 2012,
    editorial: "O'Reilly",
    isbn: "9781449331818",
  },
  {
    name: "Go Programming",
    author: "John Baugh",
    year: 2010,
    isbn: "1453636676",
  },
  { name: "Element 3", author: "author 3" },
  { name: "Element 4", author: "author 4" },
];

export default function Books() {
  const [filter, setFilter] = useState<string>("");
  const onSearch = (value: string) => setFilter(value);

  const filterBooks = (books: BookItem[], input: string) => {
    const scores: [string, number][] = [];
    const booksMap: Record<string, BookItem> = {};
    const nInput = input.toLowerCase();
    for (const book of books) {
      let score = 0;
      const nName = book.name.toLowerCase();
      const nAuthor = book.author?.toLowerCase();
      for (const c of nInput) {
        if (nName.indexOf(c) !== -1) {
          score += 1 / nInput.length;
        }
      }
      if (nAuthor) {
        for (const c of nInput) {
          if (nAuthor.indexOf(c) !== -1) {
            score += 1 / nInput.length;
          }
        }
      }
      scores.push([book.name, score]);
      booksMap[book.name] = book;
    }
    const sorted = scores.sort((a, b) => b[1] - a[1]).slice(0, 3);
    return sorted.map((item) => booksMap[item[0]]);
  };

  //   if (filter) {
  //     filterBooks(books, filter);
  //   }

  return (
    <div>
      <Header />
      <div className="books-filters">
        <Space direction="vertical">
          <Search
            placeholder="Buscar por Título, Autor, Tema"
            onSearch={onSearch}
            style={{ width: 300 }}
          />
        </Space>
      </div>
      <div className="list">
        {filter &&
          filterBooks(books, filter).map((book: BookItem, index) => (
            <Book book={book} key={index} />
          ))}
      </div>
    </div>
  );
}
