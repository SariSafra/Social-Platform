import { useState, createContext, useContext, useRef, useEffect} from "react";
import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate, useParams,useLocation} from "react-router-dom";
import  {displayObject} from "./Tools"

const UserInfo=()=>{
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));


 
    console.log(currentUser);
      return (
        <div>
          <h2>{currentUser.name} Details:</h2>
          <ul>{displayObject(currentUser)}</ul>
        </div>
      );
    }
export default UserInfo;