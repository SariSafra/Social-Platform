import { useState, useEffect } from "react";
import { runId } from '../../Tools';

const CommentAdd = ({ comments, setComments, postId, setCommentArea }) => {
    const [inAddition, setInAddition] = useState(false);
    const [newName, setNewName] = useState("");
    const [newBody, setNewBody] = useState("");
    const currentUser = (JSON.parse(localStorage.getItem("currentUser")));
    const userEmail = currentUser ? currentUser.email : null;
    
    useEffect(() => {
        setNewBody("");
        setNewName("");
        setCommentArea("");
    }, [inAddition]);

    const AddPost = async (e) => {
        e.preventDefault();
        setInAddition(false);
        const newId = await runId("nextCommentId");
        const newComment = { postId: postId, id: newId, name: newName, email: userEmail, body: newBody }
        fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newComment),
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            setComments([...comments, newComment]);
            setCommentArea("");
        }).catch(error => {
            console.error(error);
            setCommentArea("Server error. try again later.")
        })
    }

    return (<>
        <button className="addButton" onClick={() => { setInAddition((prev) => !prev) }}>New Comment</button>
        {inAddition && (
            <form onSubmit={AddPost}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={newName} onChange={(event) => { setNewName(event.target.value) }} required />
                <label htmlFor="body">body:</label>
                <input type="text" id="body" value={newBody} onChange={(event) => { setNewBody(event.target.value) }} required />
                <button className="actionButton" type="submit">Add</button>
            </form>
        )}
    </>)
}
export default CommentAdd;