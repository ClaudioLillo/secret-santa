import type { BookItem } from "../types/books";

export const books: BookItem[] = [
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
  { name: "Kane y Abel", author: "Jeffrey Archer", editorial: "Grijalbo", isbn: "9700509095", year: 1998 },
  { name: "Manifiesto del Partido Comunista", author: "K. Marx, F. Engels", editorial: "Plutón", isbn: "9788415089391", year: 2022 },
  {
    name: "L'imperatore inesistente",
    author: "Jean-Baptiste Pérès, Richard Whately, Aristarchus Newlight",
    year: 1989,
    editorial: "Sellerio editore Palermo",
    isbn: "8838948917",
    language: 'Italian',
  }
];