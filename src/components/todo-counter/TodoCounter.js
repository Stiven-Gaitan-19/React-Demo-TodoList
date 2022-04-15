import React from 'react';
import './todoCounter.css';

function TodoCounter(props) {
  return (
    <h2 className={`counter ${props.loading && 'counter_loading'}`}>Has completado {props.todosCompleted} de {props.total} tareas</h2>
  );
}

export {TodoCounter};
