import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { runId } from "../Tools";

const PostAdd = ({ setPosts, posts, setCommentArea }) => {
    const [inAddition, setInAddition] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newBody, setNewBody] = useState("");
    const { userId } = useParams();

    useEffect(() => {
        setNewBody("");
        setNewTitle("");
        setCommentArea("");
    }, [inAddition]);

    const AddPost = async (e) => {
        e.preventDefault();
        setInAddition(false);
        const newId = await runId("nextPostId");
        const newPost = { userId: userId, id: newId, title: newTitle, body: newBody }
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

    return (<>
        <button className="addButton" onClick={() => { setInAddition((prev) => !prev) }}>New Post</button>
        {inAddition && (
            <form onSubmit={AddPost}>
                <label htmlFor="title">Name:</label>
                <input type="text" id="title" value={newTitle} onChange={(event) => { setNewTitle(event.target.value) }} required />
                <label htmlFor="body">body:</label>
                <input type="text" id="body" value={newBody} onChange={(event) => { setNewBody(event.target.value) }} required />
                <button className="actionButton" type="submit">Add</button>
            </form>
        )}
    </>)
}
export default PostAdd;