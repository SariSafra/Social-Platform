import { useState, createContext, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate, useParams, useLocation, Outlet, NavLink } from "react-router-dom";
import Photos from "./Albums/Photos/Photos";


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

  const logout = () => {
    setCurrentUser(null);
    navigate("/");
    localStorage.clear();
  }

  const styles = {
    color: 'black',
    fontSize: '20px',
    marginRight: '10px',
    textDecoration: 'none'
  };

  return (
    <>
      <NavLink style={styles} onClick={() => { logout() }}>Logout</NavLink>
      <NavLink style={styles} to="info">Info</NavLink>
      <NavLink style={styles} to="todos">Todos</NavLink>
      <NavLink style={styles} to="albums">Albums</NavLink>
      <NavLink style={styles} to="posts">Posts</NavLink>
      <Outlet />
    </>
  );
}