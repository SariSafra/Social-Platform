import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate} from "react-router-dom";
import { useState, createContext, useContext, useEffect,useHistory } from "react";
import { displayObject } from '../Tools'
import TodoRemove from "./TodoRemove";
import TodoUpdate from "./TodoUpdate";

const TodoDisplay=({ todo, todos, setTodos,index})=>{
    const [commentArea,setCommentArea]=useState("");
    const userId = (JSON.parse(localStorage.getItem("currentUser"))).id;
    //const { userId } = useParams();

    return( <>
          {displayObject(todo)} 
         
         <TodoUpdate  setTodos={setTodos} todos={todos} setCommentArea={setCommentArea} todo={todo}/>
         <TodoRemove  setTodos={setTodos} todos={todos} setCommentArea={setCommentArea} todo={todo}/>
        {<p style={{ color: 'red' }}>{commentArea}</p>}<br />
    </>  )
}
export default TodoDisplay;