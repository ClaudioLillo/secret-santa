import React, { useState } from "react";

import "./Books.css";
import Book from "./Book";
import { Space } from "antd";
import Search from "antd/es/input/Search";
import {books} from "../../data/books";
import type { BookItem } from "../../types/books";

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

  return (
    <div>
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
