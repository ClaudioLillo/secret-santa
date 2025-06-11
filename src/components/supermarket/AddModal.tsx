import { Button, Modal } from "antd";
import React, { useState } from "react";
import { SupermarketItem } from "../../types/supermarket";

type Props = {
  open: boolean;
  onOk: () => void;
  onClose: () => void;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  editMode: boolean;
  product?: SupermarketItem;
  handleDeleteItem: () => void;
  readyToSave: boolean;
};

export default function AddModal({
  open,
  onOk,
  onClose,
  onInputChange,
  editMode,
  product,
  handleDeleteItem,
  readyToSave = false,
}: Props) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={onOk}
      onClose={onClose}
      footer={
        editMode
          ? [
              <Button key="edit" type="primary" onClick={onOk}>
                Editar
              </Button>,
              <Button
                key="delete"
                onClick={handleDeleteItem}
                color="danger"
                className="delete-button"
                style={{ backgroundColor: "red", color: "white" }}
              >
                Eliminar
              </Button>,
            ]
          : [
              <Button
                key="edit"
                type="primary"
                onClick={onOk}
                disabled={!readyToSave}
              >
                Guardar
              </Button>,
            ]
      }
    >
      <h3>{editMode ? product?.fields.name : "Agregar nuevo producto"}</h3>
      <form className="modal-form">
        <div className="form-row">
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            onChange={onInputChange}
            value={product?.fields.name || ""}
          />
        </div>
        <div className="form-row">
          <label>Categoría</label>
          <input
            type="text"
            name="category"
            onChange={onInputChange}
            value={product?.fields.category || ""}
          />
        </div>
        <div className="form-row">
          <label>Cantidad</label>
          <input
            type="number"
            name="quantity"
            onChange={onInputChange}
            value={
              product?.fields.quantity ? String(product?.fields.quantity) : ""
            }
          />
        </div>
        <div className="form-row">
          <label>Marca</label>
          <input
            type="text"
            name="brand"
            onChange={onInputChange}
            value={product?.fields.brand || ""}
          />
        </div>
        <div className="form-row">
          <label>Descripción</label>
          <textarea
            name="description"
            onChange={onInputChange}
            value={product?.fields.description || ""}
          />
        </div>
      </form>
    </Modal>
  );
}
