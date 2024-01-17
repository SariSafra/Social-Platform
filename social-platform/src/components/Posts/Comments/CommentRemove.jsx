import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate,useParams} from "react-router-dom";
import { useState, createContext, useContext, useEffect,useHistory } from "react";


const CommentRemove=({commentToRemove,setCommentArea,setComments,comments})=>{
    // const userId = (JSON.parse(localStorage.getItem("currentUser"))).id;
    // const { userId } = useParams();
    const removeComment = ()=> {
        const idToDelete = commentToRemove.id;
        fetch(`http://localhost:3000/comments/${idToDelete}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            setComments(comments.filter(comment => comment.id !== idToDelete));
        }).catch(error => {
            console.error(error);
            setCommentArea("Server error. try again later.")
        });
    }

    return( <>
        <button onClick={() =>removeComment() }>🗑️</button>
    </>)
}
export default CommentRemove;