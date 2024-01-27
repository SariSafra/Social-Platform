
const TodoRemove = ({ todos, setTodos, setCommentArea, todo }) => {

    const removeTodo = (e) => {
        e.preventDefault();
        const idToDelete = todo.id;

        fetch(`http://localhost:3000/todos/${idToDelete}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            setTodos(todos.filter(prevTodo => prevTodo.id !== idToDelete));
            setCommentArea("");
        }).catch(error => {
            console.error(error);
            setCommentArea("Server error. try again later.")
        });
    }

    return (<>
        <button className="actionButton" onClick={removeTodo}>🗑️</button>
    </>)
}
export default TodoRemove;