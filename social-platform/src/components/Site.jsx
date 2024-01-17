import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate, Outlet } from "react-router-dom";
import { useState, createContext, useContext, useEffect, useHistory } from "react";
import Register from "./Register";
import Home from "./Home"
import Login from "./Login"
import UserInfo from "./UserInfo";
import Todos from "./Todos/Todos";
import Posts from "./Posts/Posts";
import Albums from "./Albums/Albums";
import NotFound from "./NotFound";
import Photos from "./Photos";

const Site = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const currentPage = currentUser ? `/users/${currentUser.id}/home` : "/login";

    return (<>
        <h1>Site</h1>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={currentPage} />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route exact path="users/:userId/home" element={<Home />} >
                    <Route path="info" element={<UserInfo />} />
                    <Route path="todos" element={<Todos />} />
                    <Route path="posts" element={<Posts />} />
                    <Route exact path="albums" element={<Outlet />} >
                        <Route index element={<Albums />} />
                        <Route path=":albumId/photos" element={<Photos />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </>)
}
export default Site;