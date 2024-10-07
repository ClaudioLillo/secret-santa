import React from "react";

import "./Tasks.css";
import Navigator from "../navigator/Navigator";
import Task from "./Task";

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
  },
  { title: "sacar la basura", description: "", status: Status.Active },
];

export default function List() {
  return (
    <div>
      <Navigator />
      <div className="list">
        {elements.map((task: TaskItem) => (
          <Task task={task} />
        ))}
      </div>
    </div>
  );
}
