import React, { useState } from "react";

import "./Recipes.css";

import Recipe, { Ingredient } from "./Recipe";
import Navigator from "../navigator/Navigator";
import { Button, Divider, Form, Input, Modal } from "antd";

const recipeItem = {
  ingredients: [
    { name: "Mantequilla", quantity: 250, unit: "gramos" },
    { name: "Azúcar", quantity: 250, unit: "gramos" },
    { name: "Harina", quantity: 100, unit: "gramos" },
  ],
  title: "Galletas de Mantequilla",
  steps: [
    "mezclar mantequilla con azúcar",
    "agregar llema de huevo y mezclar",
    "agregar harina poco a poco",
  ],
};

const item2 = {
  ingredients: [
    { name: "Champiñones", quantity: 250, unit: "gramos" },
    { name: "Arroz", quantity: 1.5, unit: "tazas" },
    { name: "Pollo", quantity: 1, unit: "pieza" },
  ],
  title: "Rissoto de champiñones",
};

const recipes = [recipeItem, item2, recipeItem];

export default function Recipes() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<{
    recipeTitle?: string;
    ingName?: string;
    ingQuantity?: number;
    ingUnit?: string;
  }>({});
  const [ing, setIng] = useState<Ingredient[]>([]);
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleOk = () => {
    setOpen(!open);
  };
  const addIngredient = () => {
    const { ingName, ingQuantity, ingUnit } = state;
    if (!ingName || !ingQuantity || !ingUnit) {
      alert("Falta un valor requerido");
      return;
    }
    setIng([...ing, { name: ingName, quantity: ingQuantity, unit: ingUnit }]);
  };
  const handleChange = ({
    recipeTitle,
    ingName,
    ingQuantity,
    ingUnit,
  }: {
    recipeTitle: string;
    ingName: string;
    ingQuantity: number;
    ingUnit: string;
  }) => {
    setState({
      ...state,
      recipeTitle: recipeTitle ?? state.recipeTitle,
      ingName: ingName ?? state.ingName,
      ingQuantity: ingQuantity ?? state.ingQuantity,
      ingUnit: ingUnit ?? state.ingUnit,
    });
  };

  return (
    <div>
      <Navigator />
      <Divider />
      <Button onClick={handleOpen}>Nueva</Button>
      <Modal open={open} onClose={handleOpen} onOk={handleOk}>
        <Form layout="inline" onValuesChange={handleChange}>
          <Form.Item label="Título Receta" name="recipeTitle">
            <Input placeholder="titulo receta" />
          </Form.Item>
          <Divider />
          <Form.Item label="Nombre" name="ingName">
            <Input placeholder="nombre" />
          </Form.Item>
          <Form.Item label="Cantidad" name="ingQuantity">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Unidad" name="ingUnit">
            <Input placeholder="unidad" />
          </Form.Item>
          <Button onClick={addIngredient}>Agregar</Button>
        </Form>
        {ing && (
          <ul>
            {ing.map((item) => (
              <li>{item.name}</li>
            ))}
          </ul>
        )}
      </Modal>
      {recipes &&
        recipes.map((item, index) => <Recipe recipe={item} key={index} />)}
      <Recipe recipe={recipeItem} />
    </div>
  );
}
