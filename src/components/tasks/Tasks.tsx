import React from "react";

import "./Tasks.css";
import Header from "../header/Header";
import Task from "./Task";
import { Select } from "antd";

enum Status {
  Active = "active",
  Disabled = "disabled",
}

export type TaskItem = {
  title: string;
  description: string;
  categories?: string[];
  status: Status;
  quantity?: number;
};

const elements: TaskItem[] = [
  {
    title: "scotch",
    description: "",
    categories: ["feria", "supermercado"],
    status: Status.Active,
    quantity: 3,
  },
  {
    title: "leche",
    description: "colún semidescremada sin lactosa",
    status: Status.Active,
    quantity: 6,
  },
  {
    title: "mantequilla",
    description: "calo pan 250g",
    status: Status.Disabled,
    quantity: 1,
    categories: ["supermercado"],
  },
  {
    title: "sacar la basura",
    description: "",
    status: Status.Active,
    categories: ["casa"],
  },
];

const options = [
  { value: "casa", label: "casa" },
  { value: "supermercado", label: "supermercado" },
  { value: "feria", label: "feria" },
];

export default function List() {
  return (
    <div>
      <Header />
      <div className="tasks-menu">
        <Select options={options} defaultValue="supermercado" />
      </div>
      <div className="tasks">
        {elements.map((task: TaskItem, index: number) => (
          <Task task={task} key={index} />
        ))}
      </div>
    </div>
  );
}
