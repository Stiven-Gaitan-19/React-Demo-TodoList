import React from 'react';

function storageChangeListener(WrappedComponent, storageKey){
    return function(props){
        let [ storageChange, setStorageChange ] = React.useState(false);
        window.addEventListener('storage', (event) => {
            if(event.key === storageKey){
                setStorageChange(true);
            }
        });

        function onSyncronize(){
            setStorageChange(false);
            props.setDesynchronized(true);
        }
        
        return (
            <WrappedComponent changedStorage={storageChange} onSyncronize={onSyncronize}/>
        );
    }

}

export { storageChangeListener };