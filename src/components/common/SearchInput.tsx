import React, { ChangeEvent } from 'react'

import './SearchInput.css'

type Props = {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({onChange}: Props){
    return (
        <div className="search-input">
            <input type="text" onChange={onChange}/>
        </div>
    )
}