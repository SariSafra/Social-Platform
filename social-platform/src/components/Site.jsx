import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
import { current_page_context } from "./CurrentPageContext";
import Register from "./Register";
import Home from "./Home"
import Login from "./Login"


const Site=()=>{
    // const [current_page, set_current_page] = useState("/login");
  //  const navigate = useNavigate();
   
    // useEffect(()=>{
    //     <Link to={current_page}>page</Link>
    //     //  navigate('/login');
    // },[current_page])
    return( <>

        {/* <current_page_context.Provider value={{current_page, set_current_page}}>  */}
        <h1>Site</h1>
       
        <BrowserRouter>
        {/* <Link to={current_page}>page</Link> */}
         <Routes> 
            <Route index element={<Login/>} ></Route>
            <Route path="register" element={<Register/>} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login/>} ></Route>

        </Routes>
        </BrowserRouter>
        {/* </current_page_context.Provider> */}
    </>  )
}
export default Site;