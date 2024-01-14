import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate} from "react-router-dom";
import { useState, createContext, useContext, useEffect,useHistory } from "react";
import Register from "./Register";
import Home from "./Home"
import Login from "./Login"

const Site=()=>{
    const [currentPage, setCurrentPage] = useState(localStorage.getItem("currentUser")?"home" : "login");
    
   // const history = useHistory();
    // useEffect(()=>{
    //     console.log(currentPage);
    //      history.push(currentPage);
    // },[currentPage]);

    return( <>
        <h1>Site</h1>
        <BrowserRouter>
         <Routes > 
            <Route path="/" element={ <Navigate to={currentPage}/>} ></Route> 
            <Route path="register" element={<Register setCurrentPage={setCurrentPage}/>} />
            <Route path="home" element={<Home setCurrentPage={setCurrentPage}/>} />
            <Route path="login" element={<Login currentPage={currentPage} setCurrentPage={setCurrentPage}/>} ></Route>
        </Routes>
        </BrowserRouter>
    </>  )
}
export default Site;