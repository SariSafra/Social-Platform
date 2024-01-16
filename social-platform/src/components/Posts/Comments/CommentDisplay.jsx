import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate} from "react-router-dom";
import { useState, createContext, useContext, useEffect,useHistory } from "react";
import CommentRemove from "./CommentRemove";


const CommentDisplay=({comment,comments,setComments})=>{
    const userEmail = (JSON.parse(localStorage.getItem("currentUser"))).email;
    //const { userId } = useParams();
    const { postId,...rest } = comment; 
    const [CommentArea,setCommentArea]=useState("");
    return( <>
           <ul>
      {Object.keys(rest).map(key => (
        <li key={key} style={{ listStyle: 'none' }}>
          <strong>{key}:</strong> {rest[key]}
        </li>
        //commentToRemove,setCommentArea,setComments,comments
      ))} 
      {comment.email===userEmail &&
     <CommentRemove commentToRemove={comment} comments={comments} setComments={setComments} setCommentArea={setCommentArea}/>}

    </ul>
    </>  )
}
export default CommentDisplay;