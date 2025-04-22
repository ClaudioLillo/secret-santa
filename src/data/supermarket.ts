import axios from "axios";
import { SupermarketItem } from "../types/supermarket";

const SUPERMARKET_URL =
  "https://1mkmi7steb.execute-api.us-east-1.amazonaws.com/apiv1/supermarket";

export const createSupermarketItem = async (
  supermarketItem: SupermarketItem
) => {
  const token = localStorage.getItem("token");
  const config = {
    url: SUPERMARKET_URL,
    method: "POST",
    data: {
      ...supermarketItem,
    },
    headers: { "Content-Type": "application/json", authorization: token },
  };
  const response = await axios(config);
  return response;
};

export const getSupermarketItems = async () => {
  const config = {
    url: SUPERMARKET_URL,
    method: "GET",
  };
  const response = await axios(config);
  return response.data.data.Items.map(
    (item: { fields: SupermarketItem; name: string }) => ({
      fields: item,
      name: item.name,
    })
  ) as SupermarketItem[];
};

export const deleteSupermarketItem = async ({
  sk,
  pk,
}: {
  sk: string;
  pk: string;
}) => {
  const token = localStorage.getItem("token");
  const config = {
    url: SUPERMARKET_URL,
    method: "DELETE",
    data: {
      pk,
      sk,
    },
    headers: { "Content-Type": "application/json", authorization: token },
  };
  const response = await axios(config);
  return response;
};

export const editSupermarketItem = async (supermarketItem: SupermarketItem) => {
  const token = localStorage.getItem("token");
  const { sk, pk } = supermarketItem.fields;
  if (!sk || !pk) {
    return new Error("sk or pk were not provided");
  }
  const config = {
    url: SUPERMARKET_URL,
    method: "PUT",
    data: {
      ...supermarketItem.fields,
    },
    headers: { "Content-Type": "application/json", authorization: token },
  };
  const response = await axios(config);
  return response.data.data.Items as SupermarketItem[];
};
