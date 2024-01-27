import { useState, useEffect } from "react";
import CommentDisplay from './CommentDisplay';
import CommentAdd from "./CommentAdd";

const Comments = ({ postId }) => {

    const [comments, setComments] = useState([]);
    const [commentArea, setCommentArea] = useState("")

    useEffect(() => {
        requestPostsComments();
    }, [])

    const requestPostsComments = () => {
        fetch(`http://localhost:3000/comments/?postId=${Number(postId)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (Object.keys(data).length === 0) {
                    setCommentArea("This post has no comments.");
                } else {
                    setComments(data);
                }
            })
            .catch(error => {
                console.error(error);
                setCommentArea("Server error. try again later.")
            });
    }

    return (
        <div>
            <br />
            <h2 className="title">Comments</h2>
            <CommentAdd comments={comments} setComments={setComments} postId={postId} setCommentArea={setCommentArea} />
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id} className="list">
                        <CommentDisplay comment={comment} comments={comments} setComments={setComments} />
                    </li>
                ))}
            </ul>
            <p className='commentArea'>{commentArea}</p>
        </div>)
}
export default Comments;