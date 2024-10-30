import { Modal, Table, Typography } from "antd";
import React, { useState } from "react";

import "./Recipes.css";

type RecipeItem = {
  title: string;
  ingredients: Ingredient[];
  steps?: string[];
};

export type Ingredient = {
  name: string;
  quantity: number;
  unit: string;
};

const columns = [
  {
    title: "Ingrediente",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Cantidad",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Unidad",
    dataIndex: "unit",
    key: "unit",
  },
];

export default function Recipe({
  recipe: { ingredients, title, steps },
}: {
  recipe: RecipeItem;
}) {
  const [open, setOpen] = useState(false);
  const data = ingredients.map((item) => ({
    ...item,
    key: item.name,
  }));
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div>
      <Modal open={open} onOk={handleOpen} onCancel={handleOpen}>
        <Table dataSource={data} columns={columns} pagination={false} />
        <Typography>Preparación</Typography>
        {steps && (
          <ul>
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        )}
      </Modal>
      <div className="recipe-item" onClick={handleOpen}>
        <h1 className="recipe-section">{title}</h1>
      </div>
    </div>
  );
}
