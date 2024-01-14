import { useState, createContext, useContext, useRef} from "react";
import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate, useParams} from "react-router-dom";

const UserInfo=()=>{
    const userDetails = (JSON.parse(localStorage.getItem("currentUser")));
    console.log(userDetails);
    return(<>
    <h1>Info</h1>
    <div>{userDetails}</div>
    </>
    )
}
export default UserInfo;