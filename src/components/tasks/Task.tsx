import { Tag } from "antd";
import React from "react";

import type { TaskItem } from "./Tasks";

const categoryColor: Record<string, string> = {
  feria: "magenta",
  supermercado: "green",
  aseo: "purple",
};

export default function Task({ task }: { task: TaskItem }) {
  const primaryText = `${task.title}${
    task.quantity ? ` | ${task.quantity}` : ""
  }`;
  return (
    <div className="task">
      <p className="task-title">{primaryText}</p>
      {task.categories && (
        <div className="task-tags">
          {task.categories.map((cat) => (
            <Tag color={categoryColor[cat]}>{cat}</Tag>
          ))}
        </div>
      )}
    </div>
  );
}
