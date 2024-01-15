import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate } from "react-router-dom";
import { useState, createContext, useContext, useEffect, useHistory, useRef } from "react";


const TodosCRUD = ({ todos, setTodos, setCommentArea }) => {

    const [inRemoval, setInRemoval] = useState(false);
    const [inAddition, setInAddition] = useState(false);
    const [inUpdate, setInUpdate] = useState(false);

    const [idToUpdate, setIdToUpdate] = useState("0");
    const [updatedTitle, setUpdatedTitle] = useState("");

    const idToDeleteRef = useRef(null);

    const removeTodo = (e) => {
        e.preventDefault();
        setInRemoval(false);
        const idToDelete = idToDeleteRef.current.value;
        const exists = todos.some(todo => todo.id === idToDelete);
        if (!exists) {
            setCommentArea("You may not delete this task.");
            return;
        }
        fetch(`http://localhost:3000/todos/${idToDelete}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            setTodos(todos.filter(todo => todo.id !== idToDelete));
        }).catch(error => {
            console.error(error);
            setCommentArea("Server error. try again later.")
        });
    }

    const updateTodo = (e) => {
        e.preventDefault();
        setInUpdate(false);
        const foundTodo = todos.find(todo => todo.id === idToUpdate);
        if (!foundTodo) {
            setCommentArea("You may not update this task.");
            return;
        }
        if (foundTodo.title === updatedTitle)
            return;
        const updatedTodo = { ...foundTodo, ["title"]: updatedTitle };
        fetch(`http://localhost:3000/todos/${idToUpdate}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTodo),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                setTodos(todos.map(todo => todo.id === idToUpdate ? updatedTodo : todo));
            }).catch(error => {
                console.error(error);
                setCommentArea("Server error. try again later.")
            });
    }

    const handleIdToUpdateChange = (event) => {
        const idToUpdate = event.target.value;
        setIdToUpdate(idToUpdate);
        const foundTodo = todos.find(todo => todo.id === idToUpdate);
        setUpdatedTitle(foundTodo ? foundTodo.title : "");
    }

    const AddTodo = async (e) => {
        e.preventDefault();
        setInAddition(false);
        const userId = JSON.parse(localStorage.getItem("currentUser")).id;
        const newId = await findMaxId;
        const newTodo = { userId: userId, id: newId, title: updatedTitle, completed: false }
        fetch('http://localhost:3000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo),
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            delete newTodo["userId"];
            setTodos([...todos, newTodo]);
        }).catch(error => {
            console.error(error);
            setGlobalError("Server error. try again later.")
        })
    }

    const findMaxId = fetch(`http://localhost:3000/todos`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                const numericIds = data.map(item => Number(item.id)).filter(id => !isNaN(id));
                return (Math.max(...numericIds) + 1).toString();
            }
            else return "1";
        })
        .catch(error => {
            console.error(error);
            setGlobalError("Server error. try again later.")
        });

        const addForm=()=>{
            setInAddition(true);
            setInRemoval(false);
            setInUpdate(false);
            setUpdatedTitle("");
            setCommentArea("");
        }
        const updateForm=()=>{
            setInUpdate(true);
            setCommentArea("");
            setInRemoval(false);
            setInAddition(false);
            setIdToUpdate("0");
            setUpdatedTitle("");
        }
        const removeForm=()=>{
            setInRemoval(true);
            setCommentArea("");
            setInAddition(false);
            setInUpdate(false);
        }

    return (<div>
        <button onClick={() => {addForm()}}>Add todo</button>
        <button onClick={() => {removeForm()}}>Remove todo</button>
        <button onClick={() => {updateForm()}}>Update todo</button>
        {inRemoval && (
            <form onSubmit={removeTodo}>
                <label htmlFor="id">Enter Id:</label>
                <input type="number" id="id" ref={idToDeleteRef} />
                <button type="submit">remove</button>
            </form>
        )}
        {inUpdate && (
            <form onSubmit={updateTodo}>
                <label htmlFor="id">Enter Id:</label>
                <input type="number" id="id" value={idToUpdate} onChange={handleIdToUpdateChange} />
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" value={updatedTitle} onChange={(event) => { setUpdatedTitle(event.target.value) }} required />
                <button type="submit">update</button>
            </form>
        )}
        {inAddition && (
            <form onSubmit={AddTodo}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" value={updatedTitle} onChange={(event) => { setUpdatedTitle(event.target.value) }} required />
                <button type="submit">Add</button>
            </form>
        )}
    </div>)
}
export default TodosCRUD;