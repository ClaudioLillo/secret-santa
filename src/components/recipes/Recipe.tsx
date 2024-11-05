import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  message,
  Modal,
  Table,
  Upload,
  UploadProps,
} from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import React, { useState } from "react";
import { deleteRecipe, editRecipe } from "../../data/recipes";
import { uploadFile } from "../../data/upload";

import "./Recipes.css";

type RecipeItem = {
  title: string;
  ingredients: Ingredient[];
  steps?: string[];
  pk?: string;
  sk?: string;
  image?: string;
};

export type Ingredient = {
  name: string;
  quantity: number;
  unit: string;
};

const columns = [
  {
    title: "Ingrediente",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Cantidad",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Unidad",
    dataIndex: "unit",
    key: "unit",
  },
];

export default function Recipe({
  recipe: { ingredients, title, steps, image, pk, sk },
}: {
  recipe: RecipeItem;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const data = ingredients.map((item, index) => ({
    ...item,
    key: `item.name-${index}`,
  }));
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleDelete = async () => {
    if (!pk || !sk) {
      return;
    }
    await deleteRecipe({ pk, sk });
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.readAsDataURL(file);
      fr.onload = () => {
        resolve(fr.result);
      };

      fr.onerror = (error) => {
        reject(error);
      };
    });
  };

  const customRequest = async (options: any) => {
    const base64 = await convertToBase64(options.file);
    const res = await uploadFile(base64);
    const id = res.data.id;
    const newRecipe = {
      ingredients,
      title,
      steps,
      image: `${id}.jpeg`,
      pk,
      sk,
    };
    const result = await editRecipe(newRecipe);
    options.onSuccess(res.data, options.file);
  };

  return (
    <div>
      <Modal
        open={open}
        onOk={handleOpen}
        onCancel={handleOpen}
        footer={[
          <Button key="back" onClick={handleOpen}>
            Volver
          </Button>,
          <Button key="edit" type="primary" onClick={handleOpen}>
            Editar
          </Button>,
          <Button key="delete" type="primary" onClick={handleDelete}>
            Eliminar
          </Button>,
        ]}
      >
        {image ? (
          <img
            src={`https://dvc7eudx12z52.cloudfront.net/${image}`}
            className="recipe-img"
          />
        ) : (
          <Upload
            name="recipeImg"
            listType="picture-card"
            className="avatar-uploader"
            onChange={handleChange}
            action="https://1mkmi7steb.execute-api.us-east-1.amazonaws.com/upload"
            method="post"
            customRequest={customRequest}
            headers={{ "Content-Type": "image/jpeg" }}
            accept={".jpeg,.jpg"}
          >
            {uploadButton}
          </Upload>
        )}
        <p className="recipe-modal-section">Ingredientes</p>
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          showHeader={false}
          style={{
            fontFamily: "Courier New, Courier, monospace",
            fontWeight: 200,
          }}
        />
        <Divider />
        <p className="recipe-modal-section">Preparación</p>
        {steps && (
          <ul className="steps">
            {steps.map((step, index) => (
              <li key={index} className="step-item">
                {step}
              </li>
            ))}
          </ul>
        )}
      </Modal>
      <div className="recipe-item" onClick={handleOpen}>
        <p className="recipe-item-text">{title}</p>
      </div>
    </div>
  );
}
