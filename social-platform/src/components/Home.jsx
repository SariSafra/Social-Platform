import { useState, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate, useParams} from "react-router-dom";

const Home=({currentPage, setCurrentPage})=>{
   const { action } = useParams();
   const [currentUser, setCurrentUser] = useState(localStorage.getItem("currentUser"));
    return(
       <>
       {currentUser==null ? 
       (setCurrentPage(action?'login':"login")):
       (
        <h1>Home</h1>
       )}

       </>
    )
}
export default Home;