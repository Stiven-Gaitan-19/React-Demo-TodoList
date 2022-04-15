import logo from './logo.svg';
import React from 'react';
import { TodoCounter } from './components/todo-counter/TodoCounter';
import { TodoSearch } from './components/todo-search/TodoSearch';
import { CreateTodo } from './components/create-todo/CreateTodo';
import { TodoList } from './components/todo-list/TodoList';
import { TodoItem } from './components/todo-item/TodoItem';
import { TodoForm } from './components/todo-form/TodoForm';
import { TodoHeader } from './components/todo-header/TodoHeader'
import { useLocalStorage } from './service/localstoreage'
import { ChangeAlertStoregeListener } from './components/change-alert/ChangeAlert';
import { Loading } from './components/loading/loading';
import { ErrorMessage } from './components/error-message/errorMessage';
import { Modal } from './nodes/Modal'
import './App.css';

function App() {
	const [searchValue, setSearchValue] = React.useState('');
	const [ showModal, setShowModal ] = React.useState(false);
	const [ titleEdit, setTitleEdit ] = React.useState('');
	const { items: todos, saveItems: setTodos, setDesynchronized, loading, error } = useLocalStorage('todos_v1', []);
	let todosToShow = [];
	
	if (searchValue.length > 0) {
		let titleSearch = searchValue.toLocaleLowerCase();
		todosToShow = todos.filter((todo) => {
			let todoTitle = todo.title.toLocaleLowerCase();
			return todoTitle.includes(titleSearch);
		});
	} else {
		todosToShow = todos;
	}
	let todosCompleted = todosToShow.filter((todo) => todo.done).length;
	let totalTodos = todosToShow.length;

	
	

	function deleteTask(text){
		let todosAlive = todos.filter(todo => todo.title !== text);
        setTodos(todosAlive);
	}

	function finishTask(text){
		let todo = todos.find(todo => todo.title === text);
		todo.done = !todo.done;
		let todosUpdated = [...todos];
		setTodos(todosUpdated);
	}

	function saveTask(titleTexted){
		let currentTodos = [...todos];
		currentTodos.push({
			title: titleTexted.trim(),
			done: false
		})
		setTodos(currentTodos);
	}

	function updateTask(newTitle, oldTitle){
		let tmpTodos = [...todos];
		tmpTodos.forEach(todo => {
			if(todo.title === titleEdit){
				todo.title = newTitle;
			}
		});

		setTodos(tmpTodos);
		setTitleEdit('');
	}

	function editTask(title){
		setTitleEdit(title);
		setShowModal(true);
	}

	return (
		<React.Fragment>
			<TodoHeader loading={loading}>
				<TodoCounter total={totalTodos} todosCompleted={todosCompleted} />
				<TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
			</TodoHeader>
			
			<TodoList
				loading={loading}
				error={error}
				todosToShow={todosToShow}
				searchValue={searchValue}
				onLoading={() => <Loading/>}
				onError={() => <ErrorMessage/>}
				onEmpty={() => <div style={{padding: '20px'}}><p>Crea tu primera Tarea</p></div>}
				onNotSearchResults={() => <p>No hay resultados para "{searchValue}"</p>}
			>
				{item => <TodoItem
					key={item.title}
					title={item.title}
					completed={item.done}
					editTask={() => editTask(item.title)}
					onDeleteTask={() => deleteTask(item.title)}
					onFinishTask={() => finishTask(item.title)}
				/>}
			</TodoList>

			<CreateTodo setShowModal={setShowModal}/>

			{showModal && (
				<Modal>
					<TodoForm 
						saveTask={saveTask} 
						setShowModal={setShowModal} 
						titleEdit={titleEdit} 
						setTitleEdit={setTitleEdit} 
						updateTask={updateTask}
					/>
				</Modal>
			)}

			<ChangeAlertStoregeListener setDesynchronized={setDesynchronized}/>
			
		</React.Fragment>
	);
}

export default App;
