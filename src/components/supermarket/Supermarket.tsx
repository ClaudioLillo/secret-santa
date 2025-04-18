import React, {ChangeEvent, useEffect, useState} from 'react';
import Header from '../header/Header';
import { Button, Modal } from 'antd';
import SearchInput from '../common/SearchInput';
import Switch from '../common/Switch';

import './Supermarket.css';
import { SupermarketItem } from '../../types/supermarket';
import SupermarketTable from './SupermarketTable';
import { createSupermarketItem, getSupermarketItems } from '../../data/supermarket';
import AddModal from './AddModal';

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
    });
    const [selectedProduct, setSelectedProduct] = useState<SupermarketItem|undefined>(undefined);
    const [productDetailsOpen, setProductDetailsOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value.toLowerCase());
    }

    const filterItems = (items: SupermarketItem[]) => {
        return filter === '' ?
        items:
        items.filter(item => (item.name).toLowerCase().search(filter) >=0)
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
        try{
            const response = await createSupermarketItem(newItem)
        setAddModalOpen(false);
        setNewItem({
            name: '',
        quantity: 0,
        active: true,
        category: '',
        imageUrl: '',
        brand: '',
        });
        if(response.status === 200){
            alert('el producto ha sido guardado exitosamente');
            setSelectedProduct(undefined);
            window.location.reload();
        }
        }
        catch(e){
            console.log(e);
            alert('Error al guardar')
        }
        
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'quantity'){
            setNewItem({...newItem, quantity: parseInt(e.target.value)});
            return;
        }
        setNewItem({...newItem, [e.target.name]: e.target.value});
    }

    useEffect(()=>{
        getSupermarketItems()
        .then(data=>{
            setItems(data)
        })
    }, [])

    const dataSource = removeDisabled(filterItems(items.map((item, index)=>({...item, key: index}))))

    const onRowClick = (rowId: string) => () =>{
        setSelectedProduct(items.find((item)=> item.name === rowId))
        setProductDetailsOpen(true);
    }

    const enableEditMode = () => {
        setEditMode(true);
        setAddModalOpen(true);
        setProductDetailsOpen(false);
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
                {items.length > 0 && <SupermarketTable dataSource={dataSource} columns={columns} onRowClick={onRowClick} displayStatus={onlyActive}/>}
            </div>
            <AddModal 
                open={addModalOpen}
                editMode={editMode}
                onOk={addProduct}
                onInputChange={handleChange}
                onClose={()=>setAddModalOpen(false)}
                product={selectedProduct}

            />

            <Modal 
                open={productDetailsOpen} 
                onCancel={()=>{
                    enableEditMode();
                }} 
                onOk={()=>{setProductDetailsOpen(false)}} 
                onClose={()=>{setProductDetailsOpen(false)}}
                cancelText="Editar"
            >
                <h3>{selectedProduct?.name}</h3>
                <h3>Descripción</h3>
                <p>Aquí van los detalles del producto, como presentación, contenido de lactosa, etc</p>
                <h3>Marca</h3>
                <p>{selectedProduct?.brand}</p>
            </Modal>
        </div>
        
    )
}