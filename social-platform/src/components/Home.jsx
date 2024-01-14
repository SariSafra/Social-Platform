import { useState, createContext, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate, useParams} from "react-router-dom";
import UserInfo from "./UserInfo";

const Home=()=>{
   const [currentUser, setCurrentUser] = useState(localStorage.getItem("currentUser"));
 const navigate = useNavigate();
useEffect(()=>{
currentUser==null && navigate("/login")
      
},[])
    return(
       <>
        <h1>Home</h1>
        <Link to="/info">Info</Link>
        {/* <Link onClick={<UserInformation/>}>Info</Link>
        <Link onClick={<UserInformation/>}>Info</Link>
        <Link onClick={<UserInformation/>}>Info</Link>
        <Link onClick={<UserInformation/>}>Info</Link> */}
       </>
    )
}
export default Home;