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
import { useLocation, useNavigate } from 'react-router-dom';

export type Page = {
    name: string;
    icon: JSX.Element;
    path: string;
    iconSelected?: JSX.Element;
} 

export default function HomePage(){
    const location = useLocation();
      const path = location.pathname.split("/")[1];
    const navigate =useNavigate()
    const pages: Page[] = [
        {name: 'Dispositivos', icon: <Devices/>, path:'devices', iconSelected: <Devices color="purple"/>},
        {name: 'Tareas', icon: <Tasks/>,path:'taks'},
        {name: 'Libros', icon: <Books/>,path:'books'},
        {name: 'Recetas', icon: <Recipes/>,path:'recipes'},
        {name: 'Plantas', icon: <Plant/>,path:'plants'},
        {name: 'Configuración', icon: <Settings/>,path:'settings'},
        {name: 'Supermercado', icon: <Supermarket/>,path:'supermarket'},
    ]

    return (
        <div className="home">
            {pages.map((page)=>(
                <PageCard {...page}/>
            ))}
        </div>
    )
}