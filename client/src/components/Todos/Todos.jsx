import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TodoAdd from "./TodoAdd";
import TodosDisplay from "./TodosDisplay";

const Todos = () => {
    const { userId } = useParams();
    const [todos, setTodos] = useState([]);
    const [commentArea, setCommentArea] = useState("")

    useEffect(() => {
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
        <h2 className="title">Todos</h2>
        <TodoAdd setTodos={setTodos} todos={todos} setCommentArea={setCommentArea} /><br />
        <TodosDisplay todos={todos} setTodos={setTodos} />
        <p className='commentArea'>{commentArea}</p>
    </>)
}
export default Todos;