import { useState } from "react";
import { displayObject } from '../Tools'
import TodoRemove from "./TodoRemove";
import TodoUpdate from "./TodoUpdate";

const TodoDisplay = ({ todo, todos, setTodos }) => {
    const [commentArea, setCommentArea] = useState("");

    return (<>
        {displayObject(todo)}
        <TodoUpdate setTodos={setTodos} todos={todos} setCommentArea={setCommentArea} todoToUpdate={todo} />
        <TodoRemove setTodos={setTodos} todos={todos} setCommentArea={setCommentArea} todo={todo} />
        {<p className='commentArea'>{commentArea}</p>}
    </>)
}
export default TodoDisplay;