import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate} from "react-router-dom";
import { useState, createContext, useContext, useEffect,useHistory } from "react";
import { displayObject } from '../Tools'
import TodoRemove from "./TodoRemove";
import TodoUpdate from "./TodoUpdate";

const TodoDisplay=({ todo, todos, setTodos,index})=>{
    const [commentArea,setCommentArea]=useState("");
    const userId = (JSON.parse(localStorage.getItem("currentUser"))).id;
    //const { userId } = useParams();

    // const updateCompletedTodo = (key, newValue, index) => {
    //     const updatedTodo = { ...todos[index], [key]: newValue };
    //     fetch(`http://localhost:3000/todos/${todos[index].id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({"userId": userId,...updatedTodo}),
    //     })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error(`Request failed with status: ${response.status}`);
    //             }
    //             setTodos(todos.map(todo => todo.id === todos[index].id ? updatedTodo : todo));
    //         }).catch(error => {
    //             console.error(error);
    //             setCommentArea("Server error. try again later.")
    //         });
    // };
    return( <>
          {displayObject(todo)} 
         
         <TodoUpdate  setTodos={setTodos} todos={todos} setCommentArea={setCommentArea} todo={todo}/>
         <TodoRemove  setTodos={setTodos} todos={todos} setCommentArea={setCommentArea} todo={todo}/>
        {<p style={{ color: 'red' }}>{commentArea}</p>}<br />
    </>  )
}
export default TodoDisplay;