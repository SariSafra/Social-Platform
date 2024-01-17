import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate, useLocation, useParams } from "react-router-dom";
import { useState, createContext, useContext, useEffect, useHistory, useRef } from "react";
import TodoAdd from "./TodoAdd";
import TodoUpdate from "./TodoUpdate";
import TodoRemove from "./TodoRemove";
import TodosDisplay from "./TodosDisplay";

const Todos = () => {
    const userId = (JSON.parse(localStorage.getItem("currentUser"))).id;
    //const { userId } = useParams();
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [commentArea, setCommentArea] = useState("")

    useEffect(() => {
        navigate("/home/users/"+ userId+"/todos");
        requestUserTodos();
    }, [])

    const requestUserTodos = () => {
        fetch(`http://localhost:3000/todos/?userId=${Number(userId)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (Object.keys(data).length === 0) {
                    setCommentArea("You have no todos.");
                } else {
                    data.map(todo => (delete todo["userId"]))
                    setTodos(data);
                }
            })
            .catch(error => {
                console.error(error);
                setCommentArea("Server error. try again later.")
            });
    }
    
    return (<>
        <h1>Todos</h1>
        <TodoAdd setTodos={setTodos} todos={todos} setCommentArea={setCommentArea} /><br/>
        <TodosDisplay todos={todos} setTodos={setTodos} setCommentArea={setCommentArea}/>
    </>)
}
export default Todos;