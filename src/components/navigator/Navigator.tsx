import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./Navigator.css";

type NavOption = {
  path: string;
  name: string;
};

const options: NavOption[] = [
  { name: "Dispositivos", path: "devices" },
  { name: "Tareas", path: "tasks" },
  { name: "Libros", path: "books" },
  { name: "Recetas", path: "recipes" },
  { name: "Configuración", path: "settings" },
];

export default function Navigator() {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const navigate = useNavigate();
  const goTo = (path: string) => () => {
    navigate(`/${path}`);
  };
  return (
    <div className="navigator">
      {options &&
        options.map((option: NavOption) => (
          <button
            className={
              path === option.path
                ? "navigator-option-selected"
                : "navigator-option"
            }
            key={option.path}
            onClick={goTo(option.path)}
          >
            {option.name}
          </button>
        ))}
    </div>
  );
}
