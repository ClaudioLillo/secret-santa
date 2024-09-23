import React, { useState, useEffect, ChangeEvent } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Divider, Form, Input, Select } from "antd";

type State = {
  sk?: string;
  password?: string;
  items?: any[];
};

export default function Login() {
  const [state, setState] = useState<State>({});
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const getUsers = async () => {
    const config = {
      url: "https://1mkmi7steb.execute-api.us-east-1.amazonaws.com/apiv1/users",
      method: "GET",
    };
    const response = await axios(config);
    return response.data.data;
  };
  const auth = async ({ sk, password }: State) => {
    const config = {
      url: "https://1mkmi7steb.execute-api.us-east-1.amazonaws.com/apiv1/login",
      method: "POST",
      data: {
        sk,
        password,
      },
      headers: { "Content-Type": "application/json" },
    };
    const response = await axios(config);
    return response.data;
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    await auth(state)
      .then(({ token }) => {
        localStorage.setItem("token", token);
        alert("Bienvenido");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log("Error de autenticación", err);
        alert("contraseña inválida, intente nuevamente");
      });
  };
  const handleChange = (e: ChangeEvent<{ name: string; value: string }>) => {
    console.log("target:", e.target);
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (e: any) => {
    console.log(e);
    setState({ ...state, sk: e });
  };
  useEffect(() => {
    getUsers()
      .then(({ Items: items }) => {
        setState({ ...state, items });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const isReady = state.items && state.items.length;
  return (
    <div className="login">
      <Button onClick={goBack} type="default">
        VOLVER
      </Button>
      <Divider />
      <Form>
        <Form.Item
          label={
            isReady
              ? "Seleccione su usuario de la lista"
              : "Aún no se han registrado usuarios, regístrese para iniciar"
          }
        >
          {isReady ? (
            <Select
              // name="sk"
              onChange={handleSelectChange}
              options={state.items?.map((item) => ({
                value: item.sk,
                label: item.fullName,
              }))}
            ></Select>
          ) : null}
        </Form.Item>
        <Form.Item label="Contraseña">
          <Input onChange={handleChange} name="password" type="password" />
        </Form.Item>
        <Form.Item>
          <Button onClick={onSubmit} type="primary">
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
