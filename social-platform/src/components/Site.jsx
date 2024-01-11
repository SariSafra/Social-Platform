import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate} from "react-router-dom";
import { useState, createContext, useContext, useEffect,useHistory } from "react";
import { current_page_context } from "./CurrentPageContext";
import Register from "./Register";
import Home from "./Home"
import Login from "./Login"


const Site=()=>{
    const [currentPage, setCurrentPage] = useState("login");
    // const history = useHistory();
    // useEffect(()=>{
    //     console.log(currentPage);
    //      history.push(currentPage);
    // },[currentPage]);
    return( <>

        {}
        <h1>Site</h1>
       
        <BrowserRouter>
      
         <Routes > 
           <Route element={ <Navigate to={currentPage}/>} ></Route> 
            <Route path="register" element={<Register setCurrentPage={setCurrentPage}/>} />

            <Route path="home" element={<Home setCurrentPage={setCurrentPage}/>} />
            <Route path="login" element={<Login setCurrentPage={setCurrentPage}/>} ></Route>
        </Routes>
        </BrowserRouter>
    </>  )
}
export default Site;