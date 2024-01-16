import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate } from "react-router-dom";
import { useState, createContext, useContext, useEffect, useHistory } from "react";
import PostDisplay from "./PostDisplay";
import PostAdd from "./PostAdd";
import PostsDisplay from "./PostsDisplay";

const Posts = () => {
    const userId = (JSON.parse(localStorage.getItem("currentUser"))).id;
    //const { userId } = useParams();

    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [commentArea, setCommentArea] = useState("")

    useEffect(() => {
        navigate("/home/users/" + userId + "/posts");
        requestUserPosts();
    }, [])

    const requestUserPosts = () => {
        fetch(`http://localhost:3000/posts/?userId=${Number(userId)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (Object.keys(data).length === 0) {
                    setCommentArea("You have no posts.");
                } else {
                    setPosts(data);
                }
            })
            .catch(error => {
                console.error(error);
                setCommentArea("Server error. try again later.")
            });
    }

    return (<>
        <h1>Posts</h1>
        <PostAdd setPosts={setPosts} posts={posts} />
        <PostsDisplay setPosts={setPosts} posts={posts}/>
        <p style={{ color: 'red' }}>{commentArea}</p>
    </>)
}
export default Posts;