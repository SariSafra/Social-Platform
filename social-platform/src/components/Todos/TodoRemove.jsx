import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate } from "react-router-dom";
import { useState, createContext, useContext, useEffect, useHistory,useRef } from "react";

const TodoRemove = ({ todos, setTodos, setCommentArea,todo }) => {
    //const [inRemoval, setInRemoval] = useState(false);
    //const idToDeleteRef = useRef(null);
   // const userId = (JSON.parse(localStorage.getItem("currentUser"))).id;

    //const { userId } = useParams();

    const removeTodo = (e) => {
        e.preventDefault();
       // setInRemoval(false);
        const idToDelete = todo.id;
        // const exists = todos.some(todo => todo.id === idToDelete);
        // if (!exists) {
        //     setCommentArea("You may not delete this task.");
        //     return;
        // }
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
        {/* <button onClick={() => { setInRemoval((prev)=>!prev) }}>Remove todo</button> */}
        {/* {inRemoval && ( */}
                 {/* <label htmlFor="id">Enter Id:</label>
                <input type="number" id="id" ref={idToDeleteRef} /> */}
                <button onClick={removeTodo}>🗑️</button>
            {/* </form> */}
        
    </>)
}
export default TodoRemove;