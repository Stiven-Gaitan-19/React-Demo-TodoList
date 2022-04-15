import './todoList.css';

function TodoList(props){
    return (
        <section>
            {props.loading && props.onLoading()}
            {props.error && props.onError()}
            
            {!props.todosToShow.length && props.searchValue && props.onNotSearchResults()}
            {!props.todosToShow.length && !props.searchValue && props.onEmpty()}
            <ul>
                {props.todosToShow.map(props.children)}
            </ul>
        </section>
    );
}

export {TodoList};