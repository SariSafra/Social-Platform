import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate} from "react-router-dom";
import { useState, createContext, useContext, useEffect,useHistory } from "react";
import Register from "./Register";
import Home from "./Home"
import Login from "./Login"
import UserInfo from "./UserInfo";

const Site=()=>{
    const [currentPage, setCurrentPage] = useState(localStorage.getItem("currentUser") ? "home" : "login");

    return( <>
        <h1>Site</h1>
        <BrowserRouter>
         <Routes > 
            <Route path="/" element={ <Navigate to={currentPage}/>} ></Route> 
            <Route path="register" element={<Register />} />
            <Route path="home" element={<Home/>} />
            <Route path="login" element={<Login  />} ></Route>
            <Route path="info" element={<UserInfo />} ></Route>
        </Routes>
        </BrowserRouter>
    </>  )
}
export default Site;