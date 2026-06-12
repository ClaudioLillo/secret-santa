import React, { useState } from "react";
import "./Home.css";
import PageCard from "./PageCard";

import Plant from "../../icons/Plants";
import Supermarket from "../../icons/supermarket";
import Settings from "../../icons/Settings";
import Books from "../../icons/Books";
import Tasks from "../../icons/Tasks";
import Recipes from "../../icons/Recipes";
import Devices from "../../icons/Devices";
import { Navigate } from "react-router-dom";

export type Page = {
  name: string;
  icon: JSX.Element;
  path: string;
  iconSelected?: JSX.Element;
};

export type Props = {
  user: string | undefined;
};

const color = "#993955";

export default function HomePage({ user }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const pages: Page[] = [
    {
      name: "Dispositivos",
      icon: <Devices color={color} />,
      path: "devices",
      iconSelected: <Devices color="purple" />,
    },
    { name: "Tareas", icon: <Tasks color={color} />, path: "taks" },
    { name: "Libros", icon: <Books color={color} />, path: "books" },
    { name: "Recetas", icon: <Recipes color={color} />, path: "recipes" },
    { name: "Plantas", icon: <Plant color={color} />, path: "plants" },
    {
      name: "Configuración",
      icon: <Settings color={color} />,
      path: "settings",
    },
    {
      name: "Supermercado",
      icon: <Supermarket color={color} />,
      path: "supermarket",
    },
  ];

  const handleCollpased = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div className="toggle-menu-collapsed" onClick={handleCollpased}>
        | | |
      </div>
      <div className={`home ${collapsed ? "collapsed" : ""}`}>
        {!user && <Navigate to="/login" />}
        {!collapsed &&
          pages.map((page, index) => (
            <PageCard {...page} key={`page-${index}`} />
          ))}
      </div>
    </>
  );
}
