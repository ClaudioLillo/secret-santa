import React from 'react';

type Plant = {
    commonName: string;
    scientificName: string;
    image?: string;
    description?: string;
}

const plants: Plant[] = [
    {
        commonName: 'Margarita de la lluvia',
        scientificName: 'Dimorphotheca pluvialis',
        description: 'Es una planta anual herbácea que alcanza 40 cm de altura, los rayos florales son blancos a azules'
    }
]

export default function Plants(){
    return(
        <div>
            <h2>Plantas</h2>
            {plants.map((plant,index)=>{
                return (
                    <span>{plant.commonName}</span>
                )
            })}
        </div>
    )
}