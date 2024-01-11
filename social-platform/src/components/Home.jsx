import { useState, createContext, useContext } from "react";
import { current_page_context } from "./CurrentPageContext";
const Home=()=>{
    const {current_page, set_current_page} = useContext(current_page_context)
    return(
       <>
               <h1>Home</h1>

       </>
    )
}
export default Home;