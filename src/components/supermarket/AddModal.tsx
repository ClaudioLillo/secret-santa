import { Modal } from "antd";
import React from "react";
import { SupermarketItem } from "../../types/supermarket";
// import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
// import {Upload, message} from "antd";
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// import { convertToBase64 } from '../../utils/compression/convertToBase64';
// import { uploadFile } from '../../data/upload';

type Props = {
  open: boolean;
  onOk: () => void;
  onClose: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editMode: boolean;
  product?: SupermarketItem;
};

export default function AddModal({
  open,
  onOk,
  onClose,
  onInputChange,
  editMode,
  product,
}: Props) {
  // const [loading, setLoading] = useState(false);
  // const uploadButton = (
  //     <button style={{ border: 0, background: "none" }} type="button">
  //       {loading ? <LoadingOutlined /> : <PlusOutlined />}
  //       <div style={{ marginTop: 8 }}>Upload</div>
  //     </button>
  //   );

  //   const handleUploadChange = (info: UploadChangeParam<UploadFile<any>>) => {
  //     if (info.file.status !== "uploading") {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === "done") {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === "error") {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   };

  //   const customRequest = async (options: any) => {
  //       const base64 = await convertToBase64(options.file);
  //       const res = await uploadFile(base64);
  //       const id = res.data.id;
  //       options.onSuccess(res.data, options.file);
  //     };

  return (
    <Modal open={open} onCancel={onClose} onOk={onOk} onClose={onClose}>
      <h3>{editMode ? product?.name : "Agregar nuevo producto"}</h3>
      <form className="modal-form">
        <div className="form-row">
          <label>Nombre</label>
          <input type="text" name="name" onChange={onInputChange} />
        </div>
        <div className="form-row">
          <label>Categoría</label>
          <input type="text" name="category" onChange={onInputChange} />
        </div>
        <div className="form-row">
          <label>Cantidad</label>
          <input type="text" name="quantity" onChange={onInputChange} />
        </div>
        <div className="form-row">
          <label>Marca</label>
          <input type="text" name="brand" onChange={onInputChange} />
        </div>
        {/* <div className="form-row">
                        <label>Descripción</label>
                        <input type="text" name="brand" onChange={onInputChange}/>
                    </div> */}
        {/* <Upload
                        name="recipeImg"
                        listType="picture-card"
                        className="avatar-uploader"
                        onChange={handleUploadChange}
                        action="https://1mkmi7steb.execute-api.us-east-1.amazonaws.com/upload"
                        method="post"
                        customRequest={customRequest}
                        headers={{ "Content-Type": "image/jpeg" }}
                        accept={".jpeg,.jpg"}
                    >
                    {uploadButton}
                    </Upload> */}
      </form>
    </Modal>
  );
}
