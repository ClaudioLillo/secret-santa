import React, { ChangeEvent, useState } from "react";

import "./Tasks.css";
import Header from "../header/Header";
import Task from "./Task";
import { Select } from "antd";
import Button from "../common/Button";

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

const columns = [
  { key: "open", label: "Abierta" },
  { key: "in-progress", label: "En progreso" },
  { key: "completed", label: "Finalizada" },
  { key: "closed", label: "Cerrada"}
];

export default function List() {
  const [column, setColumn] = useState(columns[0]);
  
  const handleChange = (e: string) => {
    console.log(e);
  }

  const handleCreate = () => {
    console.log('create');
  }
  return (
    <div>
      <div className="tasks-header">
        <Select
          style={{minWidth:150}}
          onChange={handleChange}
          defaultValue="gato"
          options={columns.map(({key, label})=>({
            value: key,
            label
          }))}
          
        />
        <Button onClick={handleCreate}>Crear</Button>
      </div>
      
      <div className="task-list">
        {elements.map((task: TaskItem, index: number) => (
          <Task task={task} key={index} />
        ))}
      </div>
    </div>
  );
}
