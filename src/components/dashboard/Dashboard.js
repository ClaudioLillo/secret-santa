import {
  Table,
  Typography,
  Button,
  Divider,
  Space,
  Segmented,
  Form,
  Input,
  Tooltip,
} from "antd";
import { DeleteOutlined, LogoutOutlined } from "@ant-design/icons";
import react, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import capitalize from "../../utils/capitalize";
// const utf8 = require("utf-8");

export default function Dashboard() {
  const [state, setState] = useState({});
  const [target, setTarget] = useState({});
  const [section, setSection] = useState("receive");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({});
  const navigate = useNavigate();

  const getTargetUser = async (user) => {
    const config = {
      method: "GET",
      url: `https://1mkmi7steb.execute-api.us-east-1.amazonaws.com/apiv1/pairs?user=${user}`,
    };
    const res = await axios(config);
    return res.data;
  };

  const getUserWishes = async (user) => {
    const config = {
      method: "GET",
      url: `https://1mkmi7steb.execute-api.us-east-1.amazonaws.com/apiv1/wishes?user=${user}`,
    };
    const res = await axios(config);
    return res.data;
  };

  const handleDeleteItem = (priority) => async () => {
    const filteredItems = items.filter((_, index) => index !== priority - 1);
    const res = await addWishes({ items: filteredItems, user: state.user });
    if (res) {
      setItems(filteredItems);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const base64 = token.split(".")[1];
      const { fullName, user } = JSON.parse(window.atob(base64));
      const fullNameUTF = decodeURIComponent(escape(fullName));
      setState({ ...state, fullName: fullNameUTF, user });
      getTargetUser(user)
        .then((res) => {
          console.log("targetUser: ", res);
          const targetUser = res.data.replace("@", "-");
          console.log(targetUser);
          getUserWishes(targetUser)
            .then(({ data, data2 }) => {
              if (data.Item && data2.Item) {
                setTarget({
                  ...target,
                  items: data.Item.items,
                  fullName: data2.Item.fullName,
                });
              } else if (!data.Item && data2.Item) {
                setTarget({
                  ...target,
                  fullName: data2.Item.fullName,
                });
              }
            })
            .catch((err) => {
              console.log("usuario target no encontrado", err);
            });
        })
        .catch((err) => {
          console.log("error al buscar el target", err);
        });
      getUserWishes(user)
        .then((res) => {
          const { items } = res.data.Item;
          setItems(items);
        })
        .catch((err) => {
          console.log("error: usuario aun no ingresa su primer deseo");
        });
    }
  }, []);

  const dataSource = items.map((item, index) => ({
    key: index,
    priority: index + 1,
    description: item.description,
    url: item.url,
  }));

  const targetDataSource = target.items
    ? target.items.map((item, index) => ({
        key: index,
        priority: index + 1,
        description: item.description,
        url: item.url,
      }))
    : [];
  const columns = [
    {
      title: "Prioridad",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Enlace",
      key: "url",
      render: (_, record) =>
        record.url !== "" ? (
          <a href={record.url} target="_blank">
            Ver
          </a>
        ) : (
          <p>Sin enlace</p>
        ),
    },
    {
      title: "Eliminar",
      key: "url",
      render: (_, record) => (
        <Button
          onClick={handleDeleteItem(record.priority)}
          icon={<DeleteOutlined style={{ color: "red" }} />}
        />
      ),
    },
  ];
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleSectionChange = (value) => {
    if (value.startsWith("E")) {
      setSection("receive");
    } else {
      setSection("give");
    }
  };
  const segmentedOptions = ["Escoger Mis Regalos", "A Quién le regalo"];
  const addWishes = async ({ user, items }) => {
    const config = {
      url: `https://1mkmi7steb.execute-api.us-east-1.amazonaws.com/apiv1/wishes`,
      method: "POST",
      data: {
        user,
        items,
      },
      headers: { "Content-Type": "application/json" },
    };
    const res = await axios(config);
    if (res.status === 200) {
      return res.data;
    }
    return false;
  };
  const handleAddWishes = async () => {
    const updatedItems = [...items, newItem];
    const res = await addWishes({ items: updatedItems, user: state.user });
    if (res) {
      setItems([...items, newItem]);
    }
  };
  const handleNewItem = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };
  return (
    <div className="dashboard">
      <Space>
        {state.user && (
          <Typography>{`Usuario: ${
            state.fullName && state.fullName
          }`}</Typography>
        )}
        <Button
          onClick={logout}
          icon={<LogoutOutlined style={{ color: "red" }} />}
        ></Button>
      </Space>

      <Divider />
      <Segmented
        options={segmentedOptions}
        onChange={handleSectionChange}
        size="large"
      />
      <Divider />
      {section === "give" && (
        <Space direction="vertical">
          {target.fullName ? (
            <Typography>{`Debes hacer un regalo a ${target.fullName}`}</Typography>
          ) : (
            <Typography>Aún no se realiza el sorteo</Typography>
          )}
          <br></br>
          <Typography>Sus opciones de regalo son</Typography>
          <Table dataSource={targetDataSource} columns={columns.slice(0, 3)} />
        </Space>
      )}
      {section === "receive" && (
        <Space direction="vertical">
          <Typography>Agrega aquí tus opciones de regalo</Typography>
          <Form>
            <Tooltip title="Debes agregar un regalo a la vez">
              <Form.Item label="Descripción">
                <TextArea
                  rows={4}
                  name="description"
                  onChange={handleNewItem}
                />
              </Form.Item>
            </Tooltip>
            <Form.Item label="Link (opcional)">
              <Input name="url" onChange={handleNewItem} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={handleAddWishes}>
                Agregar
              </Button>
            </Form.Item>
          </Form>
          <Divider />
          <Typography>Mi Lista</Typography>
          <Table
            dataSource={dataSource}
            columns={columns}
            size="middle"
          ></Table>
        </Space>
      )}
    </div>
  );
}
