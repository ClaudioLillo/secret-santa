import React, { useState } from 'react';
import Plant from './Plant';
import Header from '../header/Header';
import { Divider, Modal } from 'antd';

// type Plant = {
//     commonName: string;
//     scientificName: string;
//     image?: string;
//     description?: string;
// }

const plants = [
    {
        commonName: 'Margarita de la lluvia',
        scientificName: 'Dimorphotheca pluvialis',
        description: 'Es una planta anual herbácea que alcanza 40 cm de altura, los rayos florales son blancos a azules'
    },
    {
        commonName: 'Jirafita',
        scientificName: 'Ledebouria socialis',
        description: 'Es una planta anual herbácea qu',
    },
    {
        commonName: 'Lengua de suegra',
        scientificName: 'Sanseiveria trifasciata',
        description: '',
    },
    {
        commonName: 'Cheflera',
        scientificName: 'Schefflera arboricola',
        description: '',
    },
    {
        commonName: 'Sapito',
        scientificName: 'Maranta leuconera',
        description: '',
    },
    {
        commonName: 'Hortensia',
        scientificName: 'Hydrangea macrophylla',
        description: 'Especie originaria de Japón. Se trata de un arbusto caducifolio que crece hasta una alterua de 1 a 3 m. Las hojas son opuestas, ovales, dentadas y acuminadas, de 7 a 20 cm de longitud, con bordes rudamente dentados. Las inflorescencias se agrupan en corimbos terminales, grandes cabezas globulares de color blanco, azul rojo o rosa. El color de las flores depende del al cantidad de sulfato de aluminio que contenga el suelo. La floración se produce desde mediados de la primavera hasta finales del verano.',
    },
    
]

export default function Plants(){
    const [open, setOpen] = useState(false);
    const [targetPlant, setTargetPlant] = useState(plants[0])
    const handleModalOpen = (id: string) => () => {
        console.log({id})
        const target = plants.find(p=>p.scientificName === id);
        target && setTargetPlant(target);
        setOpen(true);
    }
    return(
        <div>
            <Header/>
            <Divider/>
            {plants.map((plant,index)=>{
                return <Plant {...plant} key={index} onClick={handleModalOpen}/>
            })}
            <Modal open={open} onOk={()=>{setOpen(false)}}>
                <h3>{targetPlant.commonName}</h3>
                <p>{targetPlant.description}</p>
            </Modal>
        </div>
    )
}