import axios from "axios";
import { Recipe } from "../types/recipes";

const RECIPES_URL =
  "https://1mkmi7steb.execute-api.us-east-1.amazonaws.com/apiv1/recipes";

export const createRecipe = async (recipe: Recipe) => {
  const token = localStorage.getItem("token");
  const config = {
    url: RECIPES_URL,
    method: "POST",
    data: {
      ...recipe,
    },
    headers: { "Content-Type": "application/json", authorization: token },
  };
  const response = await axios(config);
  return response;
};

export const getRecipes = async () => {
  const config = {
    url: RECIPES_URL,
    method: "GET",
  };
  const response = await axios(config);
  return response.data.data.Items as Recipe[];
};

export const deleteRecipe = async ({ sk, pk }: { sk: string; pk: string }) => {
  const token = localStorage.getItem("token");
  const config = {
    url: RECIPES_URL,
    method: "DELETE",
    data: {
      pk,
      sk,
    },
    headers: { "Content-Type": "application/json", authorization: token },
  };
  const response = await axios(config);
  return response.data.data.Items as Recipe[];
};

export const editRecipe = async (recipe: Recipe) => {
  const token = localStorage.getItem("token");
  const { sk, pk } = recipe;
  if (!sk || !pk) {
    return new Error("sk or pk were not provided");
  }
  const config = {
    url: RECIPES_URL,
    method: "PUT",
    data: {
      ...recipe,
    },
    headers: { "Content-Type": "application/json", authorization: token },
  };
  const response = await axios(config);
  return response.data.data.Items as Recipe[];
};
