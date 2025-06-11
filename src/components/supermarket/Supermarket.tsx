import React, { ChangeEvent, useState } from "react";
import Header from "../header/Header";
import { Button } from "antd";
import SearchInput from "../common/SearchInput";
import Switch from "../common/Switch";

import "./Supermarket.css";
import { SupermarketItem } from "../../types/supermarket";
import {
  createSupermarketItem,
  deleteSupermarketItem,
  useGetSupermarketItem,
} from "../../data/supermarket";
import AddModal from "./AddModal";
import Table from "../common/Table";
import { Columns, InitialState } from "./supermarketConfiguration";

export default function Supermarket() {
  const [filter, setFilter] = useState("");
  const [onlyActive, setOnlyActive] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<SupermarketItem>(InitialState);
  const [editMode, setEditMode] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value.toLowerCase());
  };

  const { data: items, refetch } = useGetSupermarketItem();

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
            refetch();
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

  const handleDeleteItem = async () => {
    if (newItem.name.length === 0) {
      return;
    }
    const { pk, sk } = newItem.fields;
    if (!pk || !sk) {
      return;
    }
    const res = await deleteSupermarketItem({ pk, sk });
    if (res.status === 200) {
      setAddModalOpen(false);
      alert("el producto ha sido eliminado exitosamente");
      refetch();
    }
  };

  const addProduct = async () => {
    try {
      const response = await createSupermarketItem(newItem);
      setAddModalOpen(false);
      setNewItem(InitialState);
      if (response.status === 200) {
        alert("el producto ha sido guardado exitosamente");
        refetch();
      }
    } catch (e) {
      console.log(e);
      alert("Error al guardar");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const getDataSource = (items: SupermarketItem[]) => {
    const filtered = filterItems(items);
    const ds = removeDisabled(filtered);
    ds.sort((a, b) => a.name.localeCompare(b.name));
    return onlyActive ? ds : withButtons(ds);
  };

  const onRowClick = (rowId: string) => () => {
    if (items) {
      const targetItem = items.find((item) => item.name === rowId);
      targetItem && setNewItem(targetItem);
    }
    setEditMode(true);
    setAddModalOpen(true);
  };

  const handleModalClose = () => {
    setAddModalOpen(false);
    setNewItem(InitialState);
    setEditMode(false);
  };

  const getCategories = (items: SupermarketItem[]) => {
    const categories: string[] = [];
    for (const item of items) {
      const { category } = item.fields;
      if (category && !categories.includes(category)) {
        categories.push(category);
      }
    }
    return categories;
  };

  const handleSelectedCategories = (category: string) => () => {
    if (selectedCategories.includes(category)) {
      const updatedCategories = selectedCategories.filter(
        (item) => item !== category
      );
      setSelectedCategories(updatedCategories);
      return;
    }
    setSelectedCategories([...selectedCategories, category]);
  };

  const dataSource = items && getDataSource(items);

  const readyToSave =
    newItem.fields.quantity && newItem.fields.name ? true : false;

  return (
    <div className="supermarket">
      <Header />
      <div className="supermarket-input-container">
        <SearchInput onChange={onSearchInputChange} />
        <Button
          onClick={() => {
            setAddModalOpen(true);
          }}
        >
          Agregar Nuevo
        </Button>
      </div>
      <div className="selector-container">
        <Switch onChange={handleOnlyActive} />
      </div>
      {items && items.length > 0 && dataSource && (
        <Table
          dataSource={dataSource}
          columns={Columns}
          onRowClick={onRowClick}
          displayStatus={!onlyActive}
        />
      )}
      <div className="table-info">
        <span>{`productos: ${dataSource?.length}`}</span>
      </div>
      <div>
        {dataSource &&
          getCategories(dataSource).map((item) =>
            item !== "" ? (
              <span
                className={
                  selectedCategories.includes(item) ? "chip-selected" : "chip"
                }
                onClick={handleSelectedCategories(item)}
              >
                {item.toLowerCase()}
              </span>
            ) : null
          )}
      </div>
      <AddModal
        open={addModalOpen}
        editMode={editMode}
        onOk={addProduct}
        onInputChange={handleChange}
        onClose={handleModalClose}
        product={newItem}
        handleDeleteItem={handleDeleteItem}
        readyToSave={readyToSave}
      />
    </div>
  );
}

// TODO: agregar imagen de referencia
// TODO: evitar duplicados: validacion en el formulairo
// TODO: puedo dejar solo el edit en vez del detail, y el botón editar lo activo solo si veo cambios
// en el formulario
// TODO: depender de solo un estado para crear y editar
// TODO: limpiar el newItem en el ok
// TODO: pasar los valores de los campos del formulario a valores controlados por estados, de esa forma el
// value se actualizara contra el estado

// quitar la columna de status
// quitar el cero que aparece cuando no ha cargado un usuario en el login
// agregar testing para los componentes
