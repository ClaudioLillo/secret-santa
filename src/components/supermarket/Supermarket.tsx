import React, { ChangeEvent, useEffect, useState } from "react";
import Header from "../header/Header";
import { Button, Modal } from "antd";
import SearchInput from "../common/SearchInput";
import Switch from "../common/Switch";

import "./Supermarket.css";
import { SupermarketItem } from "../../types/supermarket";
import {
  createSupermarketItem,
  getSupermarketItems,
  deleteSupermarketItem,
} from "../../data/supermarket";
import AddModal from "./AddModal";
import Table from "../common/Table";

const columns = [
  {
    title: "Producto",
    dataIndex: "name",
    key: "product",
  },
  {
    title: "Cantidad",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Status",
    dataIndex: "element",
    key: "element",
  },
];

export default function Supermarket() {
  const [filter, setFilter] = useState("");
  const [onlyActive, setOnlyActive] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [items, setItems] = useState<SupermarketItem[]>([]);
  const [newItem, setNewItem] = useState<SupermarketItem>({
    fields: {
      quantity: 0,
      active: true,
      category: "",
      imageUrl: "",
      brand: "",
      name: "",
    },
    name: "",
  });
  const [selectedProduct, setSelectedProduct] = useState<
    SupermarketItem | undefined
  >(undefined);
  const [productDetailsOpen, setProductDetailsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value.toLowerCase());
  };

  const filterItems = (items: SupermarketItem[]) => {
    return filter === ""
      ? items
      : items.filter((item) => item.name.toLowerCase().search(filter) >= 0);
  };

  const removeDisabled = (items: SupermarketItem[]) => {
    return onlyActive ? items.filter((item) => item.fields.active) : items;
  };

  const withButtons = (items: SupermarketItem[]) => {
    return items.map((item) => ({
      ...item,
      element: (
        <button
          className={item.fields.active ? "on" : "off"}
          onClick={async () => {
            await createSupermarketItem({
              ...item,
              fields: { ...item.fields, active: !item.fields.active },
            });
          }}
        >
          {item.fields.active ? "Activo" : "Inactivo"}
        </button>
      ),
    }));
  };

  const handleOnlyActive = () => {
    setOnlyActive(!onlyActive);
  };

  const handleAddModalOpen = () => {
    setAddModalOpen(!addModalOpen);
  };

  const handleDeleteItem = async () => {
    if (!selectedProduct) {
      return;
    }
    const { pk, sk } = selectedProduct.fields;
    if (!pk || !sk) {
      return;
    }
    const res = await deleteSupermarketItem({ pk, sk });
    if (res.status === 200) {
      alert("el producto ha sido eliminado exitosamente");
      setSelectedProduct(undefined);
      window.location.reload();
    }
    window.location.reload();
  };

  const addProduct = async () => {
    try {
      const response = await createSupermarketItem(newItem);
      setAddModalOpen(false);
      setNewItem({
        name: "",
        fields: {
          quantity: 0,
          active: true,
          category: "",
          imageUrl: "",
          brand: "",
          name: "",
        },
      });
      if (response.status === 200) {
        alert("el producto ha sido guardado exitosamente");
        setSelectedProduct(undefined);
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
      alert("Error al guardar");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "quantity") {
      setNewItem({
        ...newItem,
        fields: { ...newItem.fields, quantity: parseInt(e.target.value) },
      });
      return;
    }
    setNewItem({
      ...newItem,
      fields: { ...newItem.fields, [e.target.name]: e.target.value },
    });
  };

  useEffect(() => {
    getSupermarketItems().then((data) => {
      setItems(data);
    });
  }, []);

  const getDataSource = (items: SupermarketItem[]) => {
    const filtered = filterItems(items);
    const ds = removeDisabled(filtered);
    ds.sort((a, b) => a.name.localeCompare(b.name));
    return onlyActive ? ds : withButtons(ds);
  };

  const onRowClick = (rowId: string) => () => {
    setSelectedProduct(items.find((item) => item.name === rowId));
    setProductDetailsOpen(true);
  };

  const enableEditMode = () => {
    setEditMode(true);
    setAddModalOpen(true);
    setProductDetailsOpen(false);
  };

  const dataSource = getDataSource(items);

  return (
    <div className="supermarket">
      <Header />
      <div className="supermarket-input-container">
        <SearchInput onChange={onSearchInputChange} />
        <Button onClick={handleAddModalOpen}>Agregar Nuevo</Button>
      </div>
      <div className="selector-container">
        <Switch onChange={handleOnlyActive} />
      </div>
      {items.length > 0 && (
        <Table
          dataSource={dataSource}
          columns={columns}
          onRowClick={onRowClick}
          displayStatus={!onlyActive}
        />
      )}
      <AddModal
        open={addModalOpen}
        editMode={editMode}
        onOk={addProduct}
        onInputChange={handleChange}
        onClose={() => setAddModalOpen(false)}
        product={selectedProduct}
      />

      <Modal
        open={productDetailsOpen}
        onCancel={() => {
          enableEditMode();
        }}
        onOk={() => {
          setProductDetailsOpen(false);
        }}
        onClose={() => {
          setProductDetailsOpen(false);
        }}
        cancelText="Editar"
        footer={[
          <Button
            key="back"
            onClick={() => {
              setProductDetailsOpen(false);
            }}
          >
            Volver
          </Button>,
          <Button
            key="edit"
            type="primary"
            onClick={() => {
              setProductDetailsOpen(false);
            }}
          >
            Editar
          </Button>,
          <Button key="delete" type="dashed" onClick={handleDeleteItem}>
            Eliminar
          </Button>,
        ]}
      >
        <h3>{selectedProduct?.name}</h3>
        <h3>Descripción</h3>
        <p>
          Aquí van los detalles del producto, como presentación, contenido de
          lactosa, etc
        </p>
        <h3>Marca</h3>
        <p>{selectedProduct?.fields.brand}</p>
      </Modal>
    </div>
  );
}

// TODO: refrescar al editar
// TODO: agregar un método para borrar
