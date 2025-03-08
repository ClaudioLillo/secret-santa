import React from 'react';
import { useNavigate } from 'react-router-dom';

import './BackButton.css';

export default function BackButton(){
    const navigate = useNavigate();
    const goBack = ()=> {
        navigate('/')
    }
    return (
        <div className="back-button" onClick={goBack}>
            <span>Volver</span>
        </div>
    )
}