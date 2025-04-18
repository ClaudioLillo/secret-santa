import axios from "axios";
import { User } from "./login";

export const getUsers = async () => {
  const config = {
    url: "https://1mkmi7steb.execute-api.us-east-1.amazonaws.com/apiv1/users",
    method: "GET",
  };
  try {
    const response = await axios(config);
    return response.data.data.Items as User[];
  } catch (e) {
    console.log(e);
    return [];
  }
};
