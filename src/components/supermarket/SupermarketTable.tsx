import React from 'react';
import { SupermarketItem } from '../../types/supermarket';

type Column = {
    title: string;
    dataIndex: string;
    key: string;
}
type Props = {
    dataSource: SupermarketItem[];
    columns: Column[];
}

export default function SupermarketTable({dataSource, columns}: Props){
    return (
        <div className="table">
            <div className="table-header">
                {columns.map(column=>(
                    <div key={column.key} className="table-header-cell">{column.title}</div>
                ))}
            </div>
            <div className="table-body">
                {dataSource.map((row, index)=>(
                    <div className="table-row">
                    {columns.map(column=>(
                        <div className={`table-body-cell${row.active ? ' enabled':''}`} key={`${column.key}-${index}`}>{row[column.dataIndex as keyof SupermarketItem]}</div>
                    ))}
                    </div>
                ))}
            </div>
        </div>
    )
}