import React from "react";

type Column = {
  title: string;
  dataIndex: string;
  key: string;
  element?: JSX.Element;
};

interface ItemType {
  name: string;
  fields: Record<string, string | number | boolean | undefined>;
  element?: JSX.Element;
}

type Props<Item = ItemType> = {
  dataSource: Item[];
  columns: Column[];
  onRowClick: (rowId: string) => () => void;
  displayStatus: boolean;
};

const formatText = (text: string | number | boolean | undefined) => {
  switch (typeof text) {
    case "string":
      return text.toLowerCase();
    case "number":
      return text.toString();
    case "boolean":
      return text ? "V" : "F";
    default:
      return "";
  }
};

export default function SupermarketTable<Item extends ItemType>({
  dataSource,
  columns,
  onRowClick,
}: Props<Item>) {
  return (
    <div className="table">
      <div className="table-header">
        {columns.map((column) => (
          <div key={column.key} className="table-header-cell">
            {column.title}
          </div>
        ))}
      </div>
      <div className="table-body">
        {dataSource.map((row, index) => (
          <div className="table-row" key={index} onClick={onRowClick(row.name)}>
            {columns.map((column) => (
              <div className="table-body-cell" key={`${column.key}-${index}`}>
                {column.dataIndex === "element"
                  ? row.element
                  : formatText(row.fields[column.dataIndex])}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
