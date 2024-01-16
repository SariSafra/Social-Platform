import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate } from "react-router-dom";
import { useState, createContext, useContext, useEffect, useHistory } from "react";

const PostUpdate = ({postToUpdate,setCommentArea,setPosts,posts,updatedTitle,updatedBody,setInUpdate}) => {

    const updatePost = () => {
        setInUpdate(false);
        if (postToUpdate.title === updatedTitle && postToUpdate.body===updatedBody)
            return;
        const updatedPost = { ...postToUpdate, ["title"]: updatedTitle, ["body"]: updatedBody};
        fetch(`http://localhost:3000/posts/${postToUpdate.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPost),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                setPosts(posts.map(post => post.id === postToUpdate.id ? updatedPost : post));
                setCommentArea("");
            }).catch(error => {
                console.error(error);
                setCommentArea("Server error. try again later.")
            });
    }

    return (<>
       <button onClick={() =>updatePost() }>✔️</button>
    </>)
}
export default PostUpdate;