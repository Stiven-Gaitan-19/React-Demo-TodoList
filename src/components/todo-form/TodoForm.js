import React from 'react';
import './todoForm.css';

function TodoForm(props) {
    const [ text, setText ] = React.useState('');

    React.useEffect(()=>{
        if(props.titleEdit) setText(props.titleEdit);
    }, []);
    

    function saveTodo(event) {
        event.preventDefault();
        if(!props.titleEdit){
            props.saveTask(text);
        }else{
            props.updateTask(text);
        }
        
        closeModal();
    }

    function textChanged(event){
        setText(event.target.value);
    }

    function closeModal(){
        props.setShowModal(state => !state);
        if(props.titleEdit) props.setTitleEdit('');
    }

  return (
    <form onSubmit={saveTodo}>
        <label>...</label>
        <textarea onChange={textChanged} value={text} placeholder="registra tu tarea aquí..."/>
        <div className="TodoForm-buttonContainer">
            <button className="TodoForm-button TodoForm-button-cancel" onClick={closeModal}>Cancelar</button>
            <button className="TodoForm-button TodoForm-button-add" type="submit">Agregar</button>
        </div>
    </form>
  );
}

export {TodoForm};