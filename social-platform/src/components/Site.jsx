import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
import { current_page_context } from "./CurrentPageContext";
import Register from "./Register";
import Home from "./Home"
import Login from "./Login"


const Site=()=>{
    const [currentPage, setCurrentPage] = useState("/login");
    const navigate = useNavigate(); 

    useEffect(()=>{
       navigate(currentPage);
    },[currentPage, navigate]);

    return( <>

        {/* <current_page_context.Provider value={{current_page, set_current_page}}>  */}
        <h1>Site</h1>
       
        <BrowserRouter>
        {/* <Link to={current_page}>page</Link> */}
         <Routes> 
            {/* <Route index element={<Login setCurrentPage={setCurrentPage}/>} ></Route> */}
            <Route path="register" element={<Register setCurrentPage={setCurrentPage}/>} />
            <Route path="home" element={<Home setCurrentPage={setCurrentPage}/>} />
            <Route path="login" element={<Login setCurrentPage={setCurrentPage}/>} ></Route>
        </Routes>
        </BrowserRouter>
        {/* </current_page_context.Provider> */}
    </>  )
}
export default Site;