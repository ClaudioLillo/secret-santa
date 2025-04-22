export type SupermarketItem = {
  name: string;
  fields: {
    quantity: number;
    name: string;
    active: boolean;
    category?: string;
    imageUrl?: string;
    brand?: string;
    pk?: string;
    sk?: string;
  };
  element?: JSX.Element;
};
