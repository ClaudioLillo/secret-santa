import axios from "axios";

const IMAGES_URL =
  "https://1mkmi7steb.execute-api.us-east-1.amazonaws.com/upload";

export const uploadFile = async (payload: object) => {
  const token = localStorage.getItem("token");
  const config = {
    url: IMAGES_URL,
    method: "POST",
    data: {
      payload,
    },
    headers: { "Content-Type": "application/json", authorization: token },
  };
  const response = await axios(config);
  return response;
};
