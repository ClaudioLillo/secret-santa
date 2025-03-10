import React from 'react';

import './Plants.css';

type Props = {
    commonName: string;
    scientificName: string;
    description?: string;
    onClick: (id: string) => () => void;
}

export default function Plant({commonName, scientificName, onClick}: Props){
    return (
        <div className="plant" onClick={onClick(scientificName)}>
            <span>{commonName}</span>
            <span className="latin">{scientificName}</span>
        </div>
    )
}