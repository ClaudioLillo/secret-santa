import React, { useEffect, useState } from "react";

import "./Recipes.css";

import RecipeItem from "./Recipe";
import Header from "../header/Header";
import { Button, Divider, Form, Input, Modal } from "antd";
import { createRecipe, getRecipes } from "../../data/recipes";
import { Recipe, Ingredient } from "../../types/recipes";

export default function Recipes() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<{
    recipeTitle: string;
    ingName?: string;
    ingQuantity?: number;
    ingUnit?: string;
    step?: string;
  }>({ recipeTitle: "" });
  const [ing, setIng] = useState<Ingredient[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [form] = Form.useForm();

  const handleOpen = () => {
    clearStates();
    setOpen(!open);
  };

  const clearStates = () => {
    setState({ recipeTitle: "" });
    setIng([]);
    setSteps([]);
    form.resetFields();
  };

  const handleOk = async () => {
    const recipe = {
      title: state.recipeTitle,
      ingredients: ing,
      steps,
    };
    await createRecipe(recipe);
    setOpen(!open);
    clearStates();
  };
  const addIngredient = () => {
    const { ingName, ingQuantity, ingUnit } = state;
    if (!ingName || !ingQuantity || !ingUnit) {
      alert("Falta un valor requerido");
      return;
    }
    setIng([...ing, { name: ingName, quantity: ingQuantity, unit: ingUnit }]);
    form.resetFields();
    form.setFieldsValue({ recipeTitle: state.recipeTitle });
  };

  const addStep = () => {
    const { step } = state;
    if (!step) {
      alert("Falta un valor requerido");
      return;
    }
    setSteps([...steps, step]);
    form.resetFields();
    form.setFieldsValue({ recipeTitle: state.recipeTitle });
  };

  const handleChange = ({
    recipeTitle,
    ingName,
    ingQuantity,
    ingUnit,
    step,
  }: {
    recipeTitle: string;
    ingName: string;
    ingQuantity: number;
    ingUnit: string;
    step: string;
  }) => {
    setState({
      ...state,
      recipeTitle: recipeTitle ?? state.recipeTitle,
      ingName: ingName ?? state.ingName,
      ingQuantity: ingQuantity ?? state.ingQuantity,
      ingUnit: ingUnit ?? state.ingUnit,
      step: step ?? state.step,
    });
  };

  useEffect(() => {
    getRecipes()
      .then((recipes) => {
        setRecipes(recipes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Header />
      <Divider />
      <Button onClick={handleOpen} className="new-recipe-button">
        Nueva
      </Button>
      <Modal
        open={open}
        onClose={handleOpen}
        onOk={handleOk}
        onCancel={handleOpen}
      >
        <Form form={form} layout="inline" onValuesChange={handleChange}>
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
          <Button onClick={addIngredient}>Agregar Ingrediente</Button>
          {ing && (
            <ul>
              {ing.map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
          )}
          <Divider />
          <Form.Item label="Paso" name="step">
            <Input placeholder="paso" />
          </Form.Item>
          <Button onClick={addStep}>Agregar Instrucción</Button>
          {steps && (
            <ul>
              {steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          )}
        </Form>
      </Modal>
      <Divider />
      {recipes &&
        recipes.map((item, index) => <RecipeItem recipe={item} key={index} />)}
    </div>
  );
}
