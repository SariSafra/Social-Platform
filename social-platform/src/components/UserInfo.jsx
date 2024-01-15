import { useState, createContext, useContext, useRef, useEffect} from "react";
import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate, useParams,useLocation} from "react-router-dom";

const UserInfo=({displayObject})=>{
    const userDetails = (JSON.parse(localStorage.getItem("currentUser")));
    const navigate = useNavigate();  
    const currentLocation=useLocation();
    useEffect(()=>{
        navigate("/home/users/"+userDetails.id+"/info")
        },[])
 
    
      return (
        <div>
          <h2>{userDetails.name} Details:</h2>
          <ul>{displayObject(userDetails)}</ul>
        </div>
      );
    }
export default UserInfo;