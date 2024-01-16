import { useState, createContext, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate, useParams } from "react-router-dom";
import UserInfo from "./UserInfo";
import Albums from "./Albums";
import Posts from "./Posts/Posts";
import Todos from "./Todos/Todos";

const Home = () => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
  const [page, setPage] = useState(""); 
 const navigate = useNavigate();

 // const userId = currentUser.id;
  useEffect(() => {
    currentUser === null ? 
    navigate("/login") :
    navigate("/home/users/" + currentUser.id);
  }, [currentUser])


  const logout = () => {
    localStorage.clear();
    setCurrentUser(null);
    setPage("");
  }


  return (
    <>
      <h1>Home</h1>
      <Link onClick={() => { logout() }}>Logout</Link><br />
      <Link onClick={() => { setPage("info") }}>Info</Link><br />
      <Link onClick={() => { setPage("todos") }}>Todos</Link><br />
      <Link onClick={() => { setPage("albums") }}>Albums</Link><br />
      <Link onClick={() => { setPage("posts") }}>Posts</Link>

      {(page == "info" && <UserInfo  userDetails={currentUser} />) ||
        (page == "todos" && <Todos />) ||
        (page == "albums" && <Albums />) ||
        (page == "posts" && <Posts />)}

    </>
  )
}
export default Home;