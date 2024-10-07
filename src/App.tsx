import React from "react";
import "./App.css";

import Navigator from "./components/navigator/Navigator";

const options = [
  { name: "Dispositivos", path: "devices" },
  { name: "Listas", path: "lists" },
  { name: "Libros", path: "books" },
];

export default function App() {
  return (
    <div className="app">
      <Navigator />
    </div>
  );
}
