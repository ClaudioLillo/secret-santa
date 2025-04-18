import React from "react";
import { SupermarketItem } from "../../types/supermarket";

type Column = {
  title: string;
  dataIndex: string;
  key: string;
};
type Props = {
  dataSource: SupermarketItem[];
  columns: Column[];
  onRowClick: (rowId: string) => () => void;
  displayStatus: boolean;
};

const formatProduct = (product: string | number | boolean | undefined) => {
  if (typeof product === "string") {
    return product.toLowerCase();
  }
  return product;
};

const handleStatusChange = (item: SupermarketItem) => () => {
  console.log(item);
};

export default function SupermarketTable({
  dataSource,
  columns,
  onRowClick,
  displayStatus,
}: Props) {
  return (
    <div className="table">
      <div className="table-header">
        {columns.map((column) => (
          <div key={column.key} className="table-header-cell">
            {column.title}
          </div>
        ))}
        {displayStatus && <div className="table-header-cell">Estado</div>}
      </div>
      <div className="table-body">
        {dataSource.map((row, index) => (
          <div className="table-row" key={index}>
            {columns.map((column) => (
              <div
                className="table-body-cell"
                key={`${column.key}-${index}`}
                onClick={onRowClick(row.name)}
              >
                {formatProduct(row[column.dataIndex as keyof SupermarketItem])}
              </div>
            ))}
            {displayStatus && (
              <div className="table-body-cell">
                <button onClick={handleStatusChange(row)}>
                  {row.active ? "Activo" : "Inactivo"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
