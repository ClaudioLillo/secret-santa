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
        <div>
            aqui va la tabla
        </div>
    )
}