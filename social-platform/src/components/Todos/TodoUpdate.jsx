import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate, useParams } from "react-router-dom";
import { useState, createContext, useContext, useEffect, useHistory } from "react";

const TodoUpdate = ({ todos, setTodos, setCommentArea, todo }) => {
    const [inUpdate, setInUpdate] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(todo.title);
    const { userId } = useParams();

    useEffect(() => {
        setUpdatedTitle(updatedTitle);
    }, [inUpdate]);

    const updateTodo = (e) => {
        e.preventDefault();
        setInUpdate(false);

        if (todo.title === updatedTitle)
            return;
        updateTodoRequest("title", updatedTitle)
    }

    const updateTodoRequest = (key, newValue) => {
        const updatedTodo = { ...todo, [key]: newValue };
        fetch(`http://localhost:3000/todos/${todo.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "userId": userId, ...updatedTodo }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                setTodos(todos.map(todo => todo.id === todo.id ? updatedTodo : todo));
            }).catch(error => {
                console.error(error);
                setCommentArea("Server error. try again later.")
            });
    }

    return (<>
        <strong>completed:</strong>
        <input type="checkbox" checked={todo.completed} onChange={() => updateTodoRequest("completed", !todo.completed)} /><br />
        <button onClick={() => { setInUpdate((prev) => !prev) }}>🖊️</button>
        {inUpdate && (
            <form onSubmit={updateTodo}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" value={updatedTitle} onChange={(event) => { setUpdatedTitle(event.target.value) }} required />
                <button type="submit">✔️</button>
            </form>
        )}
    </>)
}

export default TodoUpdate;