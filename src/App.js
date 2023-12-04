import react from "react";
import "./App.css";
import tree from "./tree.jpeg";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

export default function App() {
  const navigate = useNavigate();
  const goTo = (path) => () => {
    navigate(`/${path}`);
  };
  return (
    <div className="app">
      <div className="container">
        <h1>AMIGO SECRETO 2023</h1>
        <Button name="register" onClick={goTo("register")}>
          REGISTRARSE
        </Button>
        <Button name="login" onClick={goTo("login")}>
          INGRESAR
        </Button>
      </div>
      <img src={tree}></img>
      <div className="footer">
        <p>&copy; Secret Santa 2023</p>
      </div>
    </div>
  );
}
