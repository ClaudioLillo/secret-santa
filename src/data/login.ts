import axios from "axios";

export type User = {
  sk?: string;
  password?: string;
  fullName?: string;
};

export const auth = async ({ sk, password }: User) => {
  const config = {
    url: "https://1mkmi7steb.execute-api.us-east-1.amazonaws.com/apiv1/login",
    method: "POST",
    data: {
      sk,
      password,
    },
    headers: { "Content-Type": "application/json" },
  };
  try {
    const response = await axios(config);
    const { token } = response.data;
    if (!token) {
      return new Error("no token provided");
    }
    localStorage.setItem("token", token);
    return token;
  } catch (e) {
    return e;
  }
};
