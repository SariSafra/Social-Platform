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
    navigate("/");
    setCurrentUser(null);
    localStorage.clear();
  }

  const styles = {
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      backgroundColor: 'white', 
      zIndex: 1000, 
      padding: '10px', 
    },
    link: {
      color: 'black',
      fontSize: '16px',
      marginRight: '10px',
      textDecoration: 'none',
    },
    content: {
      paddingTop: '60px',
    }
  };
  
  return (
    <>
      <div style={styles.navbar}>
        <h3>{currentUser && currentUser.name}</h3>
        <NavLink style={styles.link} onClick={() => { logout() }}>Logout</NavLink>
        <NavLink style={styles.link} to="info">Info</NavLink>
        <NavLink style={styles.link} to="todos">Todos</NavLink>
        <NavLink style={styles.link} to="albums">Albums</NavLink>
        <NavLink style={styles.link} to="posts">Posts</NavLink>
      </div>
      <div style={styles.content}>
        <Outlet />
      </div>
    </>
  );
}