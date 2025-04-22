import React, { useState, useEffect, ChangeEvent } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { auth, User } from "../../data/login";
import { getUsers } from "../../data/users";
import { Button, Form, Input, Select } from "antd";

export default function Login() {
  const [user, setUser] = useState<User>({});
  const [users, setUsers] = useState<User[]>([]);
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

  const handleSelectChange = (e: string) => {
    setUser({ ...user, sk: e });
  };

  useEffect(() => {
    getUsers()
      .then((users) => {
        setUsers(users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      await authenticate();
    }
  };

  const isReady = users && users.length;
  return (
    <div className="login">
      <Form onKeyDown={handleKeyDown}>
        {isReady && (
          <Form.Item label="Seleccione su usuario de la lista">
            <Select
              onChange={handleSelectChange}
              options={users.map((user) => ({
                value: user.sk,
                label: user.fullName,
              }))}
            />
          </Form.Item>
        )}
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
