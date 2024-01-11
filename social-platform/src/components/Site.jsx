import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext, useContext } from "react";

const current_page_context = createContext();

const Site=()=>{
    const [current_page, set_current_page] = useState("login");

    return(
        <current_page_context.Provider value={{current_page, set_current_page}}>
        <h1>Site</h1>
       
        </current_page_context.Provider>
    )
}
export default Site;