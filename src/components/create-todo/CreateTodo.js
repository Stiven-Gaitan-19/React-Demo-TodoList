import './createTodo.css';

function CreateTodo({setShowModal}) {

    const onCreateTask = () => {
        setShowModal(currentState => !currentState);
    }

    return (
        <button onClick={onCreateTask} className="CreateTodoButton">+</button>
    );
}

export {CreateTodo};