import React from 'react';

import './Plants.css';

type Props = {
    commonName: string;
        scientificName: string;
        description?: string;
}

export default function Plant({commonName, scientificName}: Props){
    return (
        <div className="plant">
            <span>{commonName}</span>
            <span className="latin">{scientificName}</span>
        </div>
    )
}