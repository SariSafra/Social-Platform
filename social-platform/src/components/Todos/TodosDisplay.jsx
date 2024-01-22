import { Route } from "react-router-dom";
import { useState, useEffect } from "react";
import TodoDisplay from "./TodoDisplay";

const TodosDisplay = ({ todos, setTodos }) => {

    const [sortedOption, setSortedOption] = useState("Serial");
    const [sortedTodos, setSortedTodos] = useState(todos);
    const [filterOption, setFilterOption] = useState("All");
    const [selectedId, setSelectedId] = useState("");
    const [selectedTitle, setSelectedTitle] = useState("");

    useEffect(() => {
        setSelectedId("");
        setSelectedTitle("");
    }, [filterOption]);

    useEffect(() => {
        const tempList = [...todos];
        tempList.sort(sortedOptions);
        setSortedTodos(tempList);
    }, [sortedOption, todos]);

    const sortedOptions = (todo1, todo2) => {
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

    const isFiltered = (todo) => {
        switch (filterOption) {
            case "All":
                return true;
            case "Completed":
                return todo.completed
            case "Not Completed":
                return !todo.completed
            case "Id":
                return todo.id.includes(selectedId);
            case "Title":
                return todo.title.includes(selectedTitle);
        }
    }

    return (<>
        <label className="selectorLabel" htmlFor="sortedSelector">Choose a sorted option: </label>
        <select className="selector" id="sortedSelector" value={sortedOption} onChange={(event) => { setSortedOption(event.target.value) }}>
            <option value="Random">Random</option>
            <option value="Serial">Serial</option>
            <option value="Alphabetical">Alphabetical</option>
            <option value="Completed/Not Completed">Completed/Not Completed</option>
        </select><br />
        <label className="selectorLabel" htmlFor="filterSelector">Choose a filter option: </label>
        <select className="selector" id="filterSelector" value={filterOption} onChange={(event) => { setFilterOption(event.target.value) }}>
            <option value="All">All</option>
            <option value="Id">Id</option>
            <option value="Title">Title</option>
            <option value="Completed">Completed</option>
            <option value="Not Completed">Not Completed</option>
        </select>
        {filterOption === 'Id' && (
            <><label htmlFor="idInput">Enter Id:</label>
                <input type="number" id="idInput" value={selectedId} onChange={(event) => { setSelectedId(event.target.value) }} /></>
        )}
        {filterOption === 'Title' && (
            <><label htmlFor="titleInput">Enter Title:</label>
                <input type="text" id="titleInput" value={selectedTitle} onChange={(event) => { setSelectedTitle(event.target.value) }} /></>
        )}
        <ul className="showAllItems">
            {sortedTodos.map((todo, index) => (
                <li key={index} className="list">
                    {isFiltered(todo) && <div className="showItem"><TodoDisplay todo={todo} todos={todos} setTodos={setTodos} /></div>}
                </li>
            ))}
        </ul>
    </>)
}
export default TodosDisplay;