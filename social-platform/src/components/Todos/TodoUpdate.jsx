import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate } from "react-router-dom";
import { useState, createContext, useContext, useEffect, useHistory } from "react";

const TodoUpdate = ({ todos, setTodos, setCommentArea }) => {
    const [inUpdate, setInUpdate] = useState(false);
    const [idToUpdate, setIdToUpdate] = useState("0");
    const [updatedTitle, setUpdatedTitle] = useState("");

    const userId = (JSON.parse(localStorage.getItem("currentUser"))).id;
    //const { userId } = useParams();
    useEffect(() => {
        setIdToUpdate("0");
        setUpdatedTitle("");
    }, [inUpdate]);

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
            body: JSON.stringify({ "userId": userId, ...updatedTodo }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                setTodos(todos.map(todo => todo.id === idToUpdate ? updatedTodo : todo));
                setCommentArea("");
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

    return (<>
        <button onClick={() => { setInUpdate((prev)=>!prev) }}>Update todo</button>
        {inUpdate && (
            <form onSubmit={updateTodo}>
                <label htmlFor="id">Enter Id:</label>
                <input type="number" id="id" value={idToUpdate} onChange={handleIdToUpdateChange} />
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" value={updatedTitle} onChange={(event) => { setUpdatedTitle(event.target.value) }} required />
                <button type="submit">update</button>
            </form>
        )}
    </>)
}
export default TodoUpdate;