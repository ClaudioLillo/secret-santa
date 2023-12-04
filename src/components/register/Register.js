import react, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import normalize from "../../utils/normalize";
import capitalize from "../../utils/capitalize";
import { Input, Form, Button, Divider } from "antd";

export default function Register() {
  const [state, setState] = useState({});
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const createUser = async ({ name, lastName, password }) => {
    const config = {
      url: "https://1mkmi7steb.execute-api.us-east-1.amazonaws.com/apiv1/users",
      method: "POST",
      data: {
        name: normalize(name),
        lastName: normalize(lastName),
        fullName: `${capitalize(name)} ${capitalize(lastName)}`,
        password,
      },
      headers: { "Content-Type": "application/json" },
    };
    const response = await axios(config);
    return response;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(state)
      .then((res) => {
        console.log("res: ", res);
        alert("usuario guardado correctamente");
        navigate("/");
      })
      .catch((err) => {
        console.log("No fue posible guardar", err);
      });
  };
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <div className="register">
      <Button onClick={goBack}>VOLVER</Button>
      <Divider />
      <Form>
        <Form.Item label="Nombre">
          <Input name="name" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Apellido">
          <Input name="lastName" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Contraseña">
          <Input type="password" name="password" onChange={handleChange} />
        </Form.Item>
        <Form.Item>
          <Button onClick={handleSubmit} type="primary">
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
