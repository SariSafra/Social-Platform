import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { runId } from "../Tools";

const TodoAdd = ({ todos, setTodos, setCommentArea }) => {
    const [inAddition, setInAddition] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const { userId } = useParams();

    useEffect(() => {
        setNewTitle("");
    }, [inAddition]);

    const AddTodo = async (e) => {
        e.preventDefault();
        setInAddition(false);
        const newId = await runId("nextTodoId");
        const newTodo = { userId: userId, id: newId, title: newTitle, completed: false }
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
            setCommentArea("");
        }).catch(error => {
            console.error(error);
            setCommentArea("Server error. try again later.")
        })
    }

    return (<>
        <button className="addButton" onClick={() => { setInAddition((prev) => !prev) }}>New todo</button>
        {inAddition && (
            <form onSubmit={AddTodo}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" value={newTitle} onChange={(event) => { setNewTitle(event.target.value) }} required />
                <button className="actionButton" type="submit">Add</button>
            </form>
        )}
    </>)
}
export default TodoAdd;