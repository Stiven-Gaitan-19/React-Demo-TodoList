import React from 'react';
import './errorMessage.css';

function ErrorMessage({message}) {
    return (
        <div class="error box">
            Ha ocurrido un error
        </div>
    );
}

export {ErrorMessage};