import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./Navigator.css";

type NavOption = {
  path: string;
  name: string;
};
type NavInput = {
  options: NavOption[];
};

export default function Navigator({ options }: NavInput) {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  console.log("path: ", path);
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
