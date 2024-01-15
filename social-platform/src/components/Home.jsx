import { useState, createContext, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate, useParams} from "react-router-dom";
import UserInfo from "./UserInfo";
import Albums from "./Albums";
import Posts from "./Posts";
import Todos from "./Todos";

const Home=()=>{
   const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
   const [page, setPage] = useState("");

 const navigate = useNavigate();

useEffect(()=>{
currentUser==null ? navigate("/login") :  navigate("/home/users/"+currentUser.id)
},[page])


const logout=()=>{
   setPage("")
   localStorage.clear();
   setCurrentUser(null);
}

// const displayObject = (obj, parentKey = '') => {
//    return Object.entries(obj).map(([key, value]) => {
//      const currentKey = parentKey ? `${parentKey}.${key}` : key;
//      if (typeof value === 'object' && value !== null) {
//        return (
//          <li key={currentKey} style={{listStyle: 'none'}}>
//            <strong>{key}:</strong>
//            <ul>{displayObject(value, currentKey)}</ul>
//          </li>
//        );
//      } else {
//        return (
         
//          <li key={currentKey} style={{listStyle: 'none'}}>
//            <strong>{key}:</strong> {typeof value === 'boolean' ? value.toString() : value}
//          </li>
//        );
//      }
//    });
//  };

const displayObject = (obj, updateValue, index, parentKey = '') => {
   return Object.entries(obj).map(([key, value]) => {
     const currentKey = parentKey ? `${parentKey}.${key}` : key;
     if (typeof value === 'object' && value !== null) {
       return (
         <li key={currentKey} style={{ listStyle: 'none' }}>
           <strong>{key}:</strong>
           <ul>{displayObject(value, currentKey, updateValue)}</ul>
         </li>
       );
     } else {
       return (
         <li key={currentKey} style={{ listStyle: 'none' }}>
           <strong>{key}:</strong>
           {typeof value === 'boolean' ? (
            <input type="checkbox" checked={value} onChange={() => updateValue(currentKey, !value, index)}/>
           ) : (
             value
           )}
         </li>
       );
     }
   });
 };

    return(
       <>
        <h1>Home</h1>
        <Link onClick={()=>{logout()}}>Logout</Link><br/>
        <Link onClick={()=>{setPage("info")}}>Info</Link><br/>
        <Link onClick={()=>{setPage("todos")}}>Todos</Link><br/>
        <Link onClick={()=>{setPage("albums")}}>Albums</Link><br/>
        <Link onClick={()=>{setPage("posts")}}>Posts</Link>

        {(page=="info" && <UserInfo displayObject={displayObject}/>)||
        (page=="todos" && <Todos displayObject={displayObject}/>)||
        (page=="albums" && <Albums/>)||
        (page=="posts" && <Posts/>)}

       </>
    )
}
export default Home;