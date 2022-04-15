import React from 'react';
import './todoSearch.css';

function TodoSearch({searchValue, setSearchValue, loading}){

    const onSearchTask = (event) => {
        setSearchValue(event.target.value);
    }

    return (
        <input 
            onChange={onSearchTask} 
            className="search" 
            value={searchValue}
            placeholder="buscar..."
            disabled={loading}
        />
    );
}

export { TodoSearch };
