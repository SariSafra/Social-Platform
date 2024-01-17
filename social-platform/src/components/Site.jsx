import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate, Outlet } from "react-router-dom";
import { useState, createContext, useContext, useEffect, useHistory } from "react";
import Register from "./Register";
import Home from "./Home"
import Login from "./Login"
import UserInfo from "./UserInfo";
import Todos from "./Todos/Todos";
import Posts from "./Posts/Posts";
import Albums from "./Albums";
import NotFound from "./NotFound";
import LayoutHome from "./LayoutHome"

const Site = () => {
    //const [currentPage, setCurrentPage] = useState(localStorage.getItem("currentUser") ? "home" : "login");

    return (<>
        <h1>Site</h1>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route exact path="users/:id/home" element={<Home />} >
                    <Route path="info" element={<UserInfo />} />
                    <Route path="todos" element={<Todos />} />
                    <Route path="posts" element={<Posts />} />
                    <Route path="albums" index element={<Albums />} >
                        {/* <Route path=":albumId/photos" element={<Posts />} /> */}
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </>)
}
export default Site;