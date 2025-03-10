import React, {ChangeEvent, useState} from 'react';
import Header from '../header/Header';
import { Button, Modal, Table } from 'antd';
import SearchInput from '../common/SearchInput';
import Switch from '../common/Switch';

import './Supermarket.css';
import { SupermarketItem } from '../../types/supermarket';
import SupermarketTable from './SupermarketTable';

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
        title: "Marca",
        dataIndex: "brand",
        key: "brand",
    },
]

export default function Supermarket(){
    const [filter, setFilter] = useState('');
    const [onlyActive, setOnlyActive] = useState(true);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value)
    }

    const filterItems = (items: SupermarketItem[]) => {
        return filter === '' ?
        items:
        items.filter(item => item.name.search(filter) >=0)
    }

    const removeDisabled = (items: SupermarketItem[]) => {
        return !onlyActive ?
        items:
        items.filter(item => item.active)
    }

    const handleOnlyActive = () =>{
        setOnlyActive(!onlyActive)
    }

    const items: SupermarketItem[] = [
        {name: 'mantequilla', quantity: 1, active: true, brand: 'calo'},
        {name: 'harina', quantity: 2, active: true, brand: 'selecta'},
        {name: 'crema de leche', quantity: 4, active: true},
        {name: 'atún en tarro', quantity: 4, active: true},
        {name: 'bolsas de basura', quantity: 2, active: false}
    ] 
    
    const dataSource = removeDisabled(filterItems(items.map((item, index)=>({...item, key: index}))))
    const handleAddModalOpen = () => {
        setAddModalOpen(!addModalOpen);
    }
    return (
        <div className="sumpermarket">
            <Header/>
            <div className="supermarket-input-container">
            <SearchInput onChange={onSearchInputChange}/>
            <Switch onChange={handleOnlyActive}/>
            </div>
            <div className="supermarket-input-container">
            <Button onClick={handleAddModalOpen}>Agregar Nuevo</Button>
            </div>
            <div className="supermaket">
                <SupermarketTable dataSource={dataSource} columns={columns}/>
            </div>
            <Modal open={addModalOpen} onCancel={handleAddModalOpen} onOk={handleAddModalOpen} onClose={handleAddModalOpen}>
                <h3>Agregar nuevo producto</h3>
                <form>
                    <label>Nombre</label>
                    <input type="text" id="add-product"/>
                </form>
            </Modal>
        </div>
        
    )
}