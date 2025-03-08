import React from 'react';
import Plant from './Plant';
import Header from '../header/Header';
import { Divider } from 'antd';

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
]

export default function Plants(){
    return(
        <div>
            <Header/>
            <Divider/>
            {plants.map((plant,index)=>{
                return <Plant {...plant} key={index}/>
            })}
        </div>
    )
}