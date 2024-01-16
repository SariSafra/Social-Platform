import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate} from "react-router-dom";
import { useState, createContext, useContext, useEffect,useHistory } from "react";
import { runId } from "../Tools";

const PostAdd=({setPosts, posts})=>{
    const [inAddition, setInAddition] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newBody, setNewBody] = useState("");
    const [commentArea, setCommentArea] = useState("")
    const userId = (JSON.parse(localStorage.getItem("currentUser"))).id;
    //const { userId } = useParams();]

     useEffect(() => {
        setNewBody("");
        setNewTitle("");
        setCommentArea("");
    }, [inAddition]);

    const AddPost = async (e) => {
        e.preventDefault();
        setInAddition(false);
        const newId = await runId("posts");
        const newPost = { userId: userId, id: newId, title: newTitle, body: newBody}
        fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            setPosts([...posts, newPost]);
            setCommentArea("");
        }).catch(error => {
            console.error(error);
            setCommentArea("Server error. try again later.")
        })
    }

    return( <>
        <button onClick={() => {setInAddition((prev)=>!prev)}}>New Post</button>
        {inAddition && (
            <form onSubmit={AddPost}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" value={newTitle} onChange={(event) => { setNewTitle(event.target.value) }} required />
                <label htmlFor="body">body:</label>
                <input type="text" id="body" value={newBody} onChange={(event) => { setNewBody(event.target.value) }} required />
                <button type="submit">Add</button>
            </form>
        )}
         <p style={{ color: 'red' }}>{commentArea}</p>
    </>  )
}
export default PostAdd;