import React from  'react';
import { storageChangeListener } from './StoregeChangeListener';
import './changeAlert.css';

function ChangeAlert({ changedStorage, onSyncronize }){

    function onRefreshChanges(){
        onSyncronize();
    }

    if(changedStorage){
        return (
            <div className="ModalBackground">
                <div className="modal-body">
                    <p>Tienes cambios pendientes</p>
                    <button onClick={onRefreshChanges}>Refrescar</button>
                </div>
            </div>      
        );
    }else{
        return null;
    }
}

const ChangeAlertStoregeListener = storageChangeListener(ChangeAlert, 'todos_v1');

export { ChangeAlertStoregeListener };