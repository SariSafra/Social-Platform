import { useState, createContext, useContext } from "react";
import { current_page_context } from "./CurrentPageContext";
import { Link, useNavigate } from "react-router-dom";

const Register=()=>{
    return(
       <>
        <Link to="/login"> login</Link>
         <h1>Register</h1>
       </>
    )
}
export default Register;