import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate, useParams } from "react-router-dom";
import { useState, createContext, useContext, useEffect, useHistory } from "react";

const TodoUpdate = ({ todos, setTodos, setCommentArea, todoToUpdate }) => {
    const [inUpdate, setInUpdate] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(todoToUpdate.title);

    useEffect(() => {
        setUpdatedTitle(todoToUpdate.title);
    }, [inUpdate]);

    const updateTodo = (e) => {
        e.preventDefault();
        setInUpdate(false);
        if (todoToUpdate.title === updatedTitle)
            return;
        updateTodoRequest("title", updatedTitle)
    }

    const updateTodoRequest = (key, newValue) => {
        const updatedField = { [key]: newValue };
        fetch(`http://localhost:3000/todos/${todoToUpdate.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedField),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                const updatedTodo = { ...todoToUpdate, [key]: newValue };
                setTodos(todos.map(todo => todo.id === todoToUpdate.id ? updatedTodo : todo));
            }).catch(error => {
                console.error(error);
                setCommentArea("Server error. try again later.")
            });
    }

    return (<>
        <strong>completed:</strong>
        <input type="checkbox" checked={todoToUpdate.completed} onChange={() => updateTodoRequest("completed", !todoToUpdate.completed)} /><br />
        <button className="actionButton" onClick={() => { setInUpdate((prev) => !prev) }}>🖊️</button>
        {inUpdate && (
            <form onSubmit={updateTodo}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" value={updatedTitle} onChange={(event) => { setUpdatedTitle(event.target.value) }} style={{ width: "350px" }} required />
                <button className="actionButton" type="submit">✔️</button>
            </form>
        )}
    </>)
}

export default TodoUpdate;