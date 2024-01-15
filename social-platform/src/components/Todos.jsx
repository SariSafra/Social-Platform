import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate, useLocation } from "react-router-dom";
import { useState, createContext, useContext, useEffect, useHistory, useRef } from "react";
import TodosCRUD from "./TodosCRUD";


const Todos = ({ displayObject }) => {
    const userDetails = (JSON.parse(localStorage.getItem("currentUser")));
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [commentArea, setCommentArea] = useState("")
    const [sortedOption, setSortedOption] = useState("Serial");
    const [filterOption, setFilterOption] = useState("All");
    const [selectedId, setSelectedId] = useState("0");
    const [selectedTitle, setSelectedTitle] = useState("");
   
    useEffect(() => {
        navigate("/home/users/" + userDetails.id + "/todos");
        displayUserTodos();
    }, [])

    useEffect(() => {
        const temp = [...todos];
        temp.sort(sortedOptions);
        setTodos(temp);
    }, [sortedOption]);

    useEffect(() => {
        setSelectedId("0");
        setSelectedTitle("");
    }, [filterOption]);

    function sortedOptions(todo1, todo2) {
        switch (sortedOption) {
            case "Alphabetical":
                return todo1.title.localeCompare(todo2.title);
            case "Completed/Not Completed":
                if (todo1.completed && !todo2.completed) {
                    return -1;
                } else if (!todo1.completed && todo2.completed) {
                    return 1;
                } else {
                    return 0;
                }
            default:
                return todo1.id - todo2.id;
        }
    }



    const displayUserTodos = () => {
        fetch(`http://localhost:3000/todos/?userId=${Number(userDetails.id)}`)
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

    const isFiltered = (todo) => {
        switch (filterOption) {
            case "All":
                return true;
            case "Completed":
                return todo.completed
            case "Not Completed":
                return !todo.completed
            case "Id":
             return todo.id === selectedId;
             case "Title":
                return todo.title == selectedTitle;
        }
    }

    return (<>
        <h1>Todos</h1>
        <label htmlFor="sortedSelector">Choose a sorted option:</label>
        <select id="sortedSelector" value={sortedOption} onChange={(event)=>{setSortedOption(event.target.value)}}>
            <option value="Random">Random</option>
            <option value="Serial">Serial</option>
            <option value="Alphabetical">Alphabetical</option>
            <option value="Completed/Not Completed">Completed/Not Completed</option>
        </select><br/>
        <label htmlFor="filterSelector">Choose a filter option:</label>
        <select id="filterSelector" value={filterOption} onChange={(event)=>{setFilterOption(event.target.value)}}>
            <option value="All">All</option>
            <option value="Id">Id</option>
            <option value="Title">Title</option>
            <option value="Completed">Completed</option>
            <option value="Not Completed">Not Completed</option>
        </select>
        {filterOption === 'Id' && (
           <><label htmlFor="idInput">Enter Id:</label>
                <input type="number" id="idInput" value={selectedId} onChange={(event)=>{setSelectedId(event.target.value)}} /></>
        )}
        {filterOption === 'Title' && (
            <><label htmlFor="titleInput">Enter Title:</label>
                <input type="text" id="titleInput" value={selectedTitle} onChange={(event)=>{setSelectedTitle(event.target.value)}} /></>
        )}
        <TodosCRUD todos={todos} setTodos={setTodos} setCommentArea={setCommentArea}/>
        {<p style={{ color: 'red' }}>{commentArea}</p>}<br />
        <ul>
            {todos.map(todo => (
                <li key={todo.id} style={{ listStyle: 'none', margin: '3rem' }}>
                    {isFiltered(todo) ? displayObject(todo) : <span />}
                </li>
            ))}
        </ul>
    </>)
}
export default Todos;