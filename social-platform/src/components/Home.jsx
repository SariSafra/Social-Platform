import { useState, createContext, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate, useParams, useLocation, Outlet, NavLink } from "react-router-dom";


export default function Home() {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    {
      (currentUser === null || currentUser.id !== userId) &&
      navigate("/");
    };
  }, [currentUser])

  const logout = () =>{
    setCurrentUser(null);
    navigate("/");
    localStorage.clear();
  }

  return (
    <>
      <h1>Home</h1>
      <NavLink onClick={() => { logout() }}>Logout</NavLink><br />
      <NavLink to="info">Info</NavLink><br />
      <NavLink to="todos">Todos</NavLink><br />
      <NavLink to="albums">Albums</NavLink><br />
      <NavLink to="posts">Posts</NavLink>
      <Outlet />
    </>
  )
}
