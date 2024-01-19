import { useState, useEffect } from "react";
import { useNavigate, Outlet, NavLink } from "react-router-dom";

export default function Home() {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
  const [linkClicked, setLinkClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null) {
      navigate("/");
    }
  }, [currentUser, navigate]);

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
    },
    paragraph: {
      fontFamily: 'Cursive, sans-serif',
      color: 'gray',
      fontSize: '22px',
      lineHeight: '1.8',
      fontStyle: 'italic',
      transform: 'skew(-10deg)',
    },
  };

  return (
    <>
      <div style={styles.navbar}>
        <h3>{currentUser && currentUser.name}</h3>
        <NavLink style={styles.link} onClick={() => { logout() }}>Logout</NavLink>
        <NavLink style={styles.link} to="info" onClick={() => setLinkClicked(true)}>Info</NavLink>
        <NavLink style={styles.link} to="todos" onClick={() => setLinkClicked(true)}>Todos</NavLink>
        <NavLink style={styles.link} to="albums" onClick={() => setLinkClicked(true)}>Albums</NavLink>
        <NavLink style={styles.link} to="posts" onClick={() => setLinkClicked(true)}>Posts</NavLink>
      </div>
      <div style={styles.content}>
        {!linkClicked && (
          <p style={styles.paragraph}>
            "Connect, share, and discover<br/>
            the world around you - <br/>
            where every moment becomes a story<br/>
            and every connection creates a new chapter<br/>
            in the book of your digital life."
          </p>
        )}
        <Outlet />
      </div>
    </>
  );
}
