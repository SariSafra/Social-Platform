import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, NavLink, useParams } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
  const [linkClicked, setLinkClicked] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();

  //for paragraph in home
  useEffect(() => {
    const pathSegments = window.location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    if (lastSegment !== "home") {
      setLinkClicked(true);
    }
  }, []);

  useEffect(() => {
    if (currentUser === null || currentUser.id != userId) {
      navigate("/");
    }
  }, [currentUser]);

  const logout = () => {
    localStorage.clear();
    setCurrentUser(null);
  };

  return (
    <>
      <div className="navbar">
        <h3>{currentUser && currentUser.name}</h3>
        <div className="links">
          <NavLink className="link" onClick={() => logout()}>Logout</NavLink>
          <NavLink className="link" to="info" onClick={() => setLinkClicked(true)}>Info</NavLink>
          <NavLink className="link" to="todos" onClick={() => setLinkClicked(true)}>Todos</NavLink>
          <NavLink className="link" to="albums" onClick={() => setLinkClicked(true)}>Albums</NavLink>
          <NavLink className="link" to="posts" onClick={() => setLinkClicked(true)}>Posts</NavLink>
        </div>
      </div>
      <div className="content">
        {!linkClicked && (
          <p className="paragraph">
            "Connect, share, and discover<br />
            the world around you - <br />
            where every moment becomes a story<br />
            and every connection creates a new chapter<br />
            in the book of your digital life."
          </p>
        )}
        <Outlet />
      </div>
    </>
  );
}
