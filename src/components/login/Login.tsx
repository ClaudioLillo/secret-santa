import React, { useState, ChangeEvent } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { auth, User } from "../../data/login";
import { Button, Form, Input } from "antd";

export default function Login() {
  const [user, setUser] = useState<User>({});
  const navigate = useNavigate();

  const authenticate = async () => {
    await auth(user)
      .then((token) => {
        localStorage.setItem("token", token);
        alert("Bienvenido");
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error de autenticación", err);
        alert("contraseña inválida, intente nuevamente");
      });
  };

  const onSubmit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    await authenticate();
  };
  const handleChange = (e: ChangeEvent<{ name: string; value: string }>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      await authenticate();
    }
  };

  return (
    <div className="login">
      <Form onKeyDown={handleKeyDown}>
        
          <Form.Item label="Usuario">
            <Input onChange={handleChange} name="sk" type="text" />
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
