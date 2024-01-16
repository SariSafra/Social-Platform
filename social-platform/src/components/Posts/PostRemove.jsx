import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate} from "react-router-dom";
import { useState, createContext, useContext, useEffect,useHistory } from "react";


const PostRemove=({postToRemove,setCommentArea,setPosts,posts})=>{

    const removePost = ()=> {
        const idToDelete = postToRemove.id;
        fetch(`http://localhost:3000/posts/${idToDelete}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            setPosts(posts.filter(post => post.id !== idToDelete));
        }).catch(error => {
            console.error(error);
            setCommentArea("Server error. try again later.")
        });
    }
    return( <>
        <button onClick={() =>removePost() }>🗑️</button>
    </>)
}
export default PostRemove;