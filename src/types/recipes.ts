export type Recipe = {
  title: string;
  ingredients: Ingredient[];
  steps?: string[];
  pk?: string;
  sk?: string;
  image?: string;
};

export type Ingredient = {
  name: string;
  quantity: number;
  unit: string;
};
