import React, {ChangeEvent, useEffect, useState} from 'react';
import Header from '../header/Header';
import { Button, Modal, Table } from 'antd';
import SearchInput from '../common/SearchInput';
import Switch from '../common/Switch';

import './Supermarket.css';
import { SupermarketItem } from '../../types/supermarket';
import SupermarketTable from './SupermarketTable';
import { createSupermarketItem, getSupermarketItems } from '../../data/supermarket';

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
    const [items, setItems] = useState<SupermarketItem[]>([]);
    const [newItem, setNewItem] = useState<SupermarketItem>({
        name: '',
        quantity: 0,
        active: true,
        category: '',
        imageUrl: '',
        brand: '',
    })
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

    const handleAddModalOpen = () => {
        setAddModalOpen(!addModalOpen);
    }

    const addProduct = async() => {
        await createSupermarketItem(newItem)
        setAddModalOpen(false);
        setNewItem({
            name: '',
        quantity: 0,
        active: true,
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItem({...newItem, [e.target.name]: e.target.value});
    }

    useEffect(()=>{
        getSupermarketItems()
        .then(data=>{
            console.log('data: ', data);
            setItems(data)
        })
    }, [])

    console.log('items: ', items);

    const dataSource = removeDisabled(filterItems(items.map((item, index)=>({...item, key: index}))))

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
                {items.length > 0 && <SupermarketTable dataSource={dataSource} columns={columns}/>}
            </div>
            <Modal open={addModalOpen} onCancel={handleAddModalOpen} onOk={addProduct} onClose={handleAddModalOpen}>
                <h3>Agregar nuevo producto</h3>
                <form>
                    <label>Nombre</label>
                    <input type="text" name="name" onChange={handleChange}/>
                    <br/>
                    <label>Categoría</label>
                    <input type="text" name="category" onChange={handleChange}/>
                    <br/>
                    <label>Cantidad</label>
                    <input type="text" name="quantity" onChange={handleChange}/>
                </form>
            </Modal>
        </div>
        
    )
}