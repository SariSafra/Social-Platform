import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate } from "react-router-dom";
import { useState, createContext, useContext, useEffect, useHistory } from "react";

const CommentUpdate = ({setInUpdate,commentToUpdate,setCommentArea,setComments,comments,updatedName,updatedBody, inUpdate}) => {

    const updateComment = () => {
        setInUpdate(false);
        if (commentToUpdate.name === updatedName && commentToUpdate.body===updatedBody)
            return;
        const updatedComments = { ...commentToUpdate, ["Name"]: updatedName, ["body"]: updatedBody};
        fetch(`http://localhost:3000/comments/${commentToUpdate.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedComments),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                setComments(comments.map(comment => comment.id === commentToUpdate.id ? updatedComments : comment));
                setCommentArea("");
            }).catch(error => {
                console.error(error);
                setCommentArea("Server error. try again later.")
            });
    }

    return (<>
        <button onClick={() => setInUpdate(true)}>🖊️</button>
       {inUpdate && <button onClick={() =>updateComment() }>✔️</button>}
    </>)
}
export default CommentUpdate;