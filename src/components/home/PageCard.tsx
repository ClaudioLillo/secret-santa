import React, {FC} from 'react';
import Plant from '../../icons/Plants'

type Props = {
    name: string;
    icon: React.ReactNode;
}

export default function PageCard({name, icon}: Props){
    return (
        <div className="page-card">
            <>{icon}</>
            <div>{name}</div>
        </div>
    )
}