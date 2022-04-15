import React from 'react';

export function useLocalStorage(storageKey, intialValue){

    const [ desynchronized, setDesynchronized ] = React.useState(false);
    const [ error, setError ] = React.useState(false);
    const [ loading, setLoading ] = React.useState(false);
    const [ items, setItems ] = React.useState(intialValue);

    React.useEffect(()=> {
        console.log('loadItems')
        setLoading(true);
        setTimeout(() => {
            let data = JSON.parse(localStorage.getItem(storageKey));    
            try{
                if(!data){
                    data = [
                        {
                            title: 'Hacer tarea de matematicas',
                            done: false,
                        },
                        {
                            title: 'Sacar al perro',
                            done: true,
                        },
                        {
                            title: 'Lavar la losa',
                            done: false,
                        },
                        {
                            title: 'Trbajar el dia de mañana',
                            done: false,
                        },
                    ];
    
                    let stringItems = JSON.stringify(data);
                    localStorage.setItem(storageKey, stringItems);
                    
                }

                setItems(data);
                setDesynchronized(false);
            }catch(err){
                setError(true);
            }finally{
                setLoading(false);
                
            }
            
        }, 1500);
    }, [desynchronized]);

    function saveItems(newItems){
        try{
            let stringItems = JSON.stringify(newItems);
            localStorage.setItem(storageKey, stringItems);
            setItems(newItems);
        }catch(err){
            setError(true);
        }
        
    }

    return { items, saveItems, setDesynchronized, loading, error };
}