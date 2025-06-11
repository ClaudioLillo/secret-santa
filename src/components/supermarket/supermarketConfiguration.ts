export const Columns = [
  {
    title: "Producto",
    dataIndex: "name",
    key: "product",
  },
  {
    title: "Cantidad",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Status",
    dataIndex: "element",
    key: "element",
  },
];

export const InitialState = {
  fields: {
    quantity: 0,
    active: true,
    category: "",
    imageUrl: "",
    brand: "",
    name: "",
    description: "",
  },
  name: "",
};
