import { useState, createContext, useContext, useRef, useEffect} from "react";
import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate, useParams,useLocation} from "react-router-dom";
import  {displayObject} from "./Tools"

const UserInfo=({userDetails})=>{
    const navigate = useNavigate();  
  //  const location=useLocation();
  //  const {currentLocation}=useParams()
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