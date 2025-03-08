import React, {FC, useState} from 'react';
import Plant from '../../icons/Plants'
import { useNavigate } from 'react-router-dom';

import './Home.css';

type Props = {
    name: string;
    icon: React.ReactNode;
    path: string;
    iconSelected?: React.ReactNode;
}

export default function PageCard({name, icon, iconSelected, path}: Props){
    const navigate = useNavigate();
    const [selected, setSelected] = useState(false)

    const goTo = (path: string) => () => {
        navigate(`/${path}`);
      };

    const handleSelected = (value: boolean) => () =>{
        setSelected(value);
    }

    return (
        <div className="page-card" 
            onClick={goTo(path)} 
            onMouseOver={handleSelected(true)} 
            onMouseOut={handleSelected(false)}
        >
            {selected ? iconSelected: icon}
            <div>{name}</div>
        </div>
    )
}