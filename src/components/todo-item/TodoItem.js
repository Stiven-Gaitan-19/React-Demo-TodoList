import './todoItem.css';
import React from 'react';

function TodoItem (props) {

    const [ key, setKey ] = React.useState(null);

    function itemClicked(){
        let key = setTimeout(()=> {
            itemStopClicked();
            props.editTask();
        }, 1000);
        setKey(key);
    }

    function itemStopClicked(){
        if(key){
            clearTimeout(key);
            setKey(null);
        }
    }

    return (
        <li className="TodoItem" onPointerDown={itemClicked} onPointerUp={itemStopClicked}>
            <span onClick={props.onFinishTask} className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}><i className="far fa-check-circle fa-lg"></i></span>
            <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}>{props.title}</p>
            <span onClick={props.onDeleteTask} className="Icon Icon-delete">X</span>
        </li>
    );
}

export {TodoItem};