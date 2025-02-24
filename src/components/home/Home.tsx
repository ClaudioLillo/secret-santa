import React, {FC} from 'react';
import './Home.css';
import PageCard from './PageCard';

import Plant from '../../icons/Plants';
import Supermarket from '../../icons/supermarket';
import Settings from '../../icons/Settings';
import Books from '../../icons/Books';
import Tasks from '../../icons/Tasks';
import Recipes from '../../icons/Recipes';
import Devices from '../../icons/Devices';

export type Page = {
    name: string;
    icon: JSX.Element;
} 

export default function HomePage(){
    const pages: Page[] = [
        {name: 'Dispositivos', icon: <Devices/>},
        {name: 'Tareas', icon: <Tasks/>},
        {name: 'Libros', icon: <Books/>},
        {name: 'Recetas', icon: <Recipes/>},
        {name: 'Plantas', icon: <Plant/>},
        {name: 'Configuración', icon: <Settings/>},
        {name: 'Supermercado', icon: <Supermarket/>},
    ]

    return (
        <div className="home">
            {pages.map((page)=>(
                <PageCard {...page}/>
            ))}
        </div>
    )
}