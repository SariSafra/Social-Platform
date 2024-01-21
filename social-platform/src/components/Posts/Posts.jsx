import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import PostAdd from "./PostAdd";
import PostsDisplay from "./PostsDisplay";

const Posts = () => {
    const { userId } = useParams();
    const [personalPosts, setPersonalPosts] = useState([]);
    const [othersPosts, setOthersPosts] = useState([]);
    const [commentArea, setCommentArea] = useState("")
    const [personalOrOtherPosts, setPersonalOrOtherPosts] = useState("personal");

    useEffect(() => {
        personalOrOtherPosts === "personal" && requestUserPosts();
        personalOrOtherPosts === "other" && requestOthersPosts();
    }, [personalOrOtherPosts])

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
                    setPersonalPosts(data);
                }
            })
            .catch(error => {
                console.error(error);
                setCommentArea("Server error. try again later.")
            });
    }

    const requestOthersPosts = () => {
        fetch(`http://localhost:3000/posts`)
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
                    setOthersPosts(data.filter(post => post.userId != userId));
                }
            })
            .catch(error => {
                console.error(error);
                setCommentArea("Server error. try again later.")
            });
    }

    return (<>
        <h2 className="title">{personalOrOtherPosts==="personal" ? "My Posts" : "Posts"}</h2>
        {personalOrOtherPosts ==="personal" ? 
        <><button onClick={()=>{setPersonalOrOtherPosts("other")}}>Posts by others</button><br/><br/>
        <PostAdd setPosts={setPersonalPosts} posts={personalPosts} setCommentArea={setCommentArea}/><br/>
        <PostsDisplay setPosts={setPersonalPosts} posts={personalPosts} personalOrOtherPosts={personalOrOtherPosts}/>
        <p style={{ color: 'red' }}>{commentArea}</p></>
        :
        <><button onClick={()=>{setPersonalOrOtherPosts("personal")}}>My Posts</button><br/><br/>
        <PostsDisplay setPosts={setOthersPosts} posts={othersPosts} personalOrOtherPosts={personalOrOtherPosts}/>
        <p style={{ color: 'red' }}>{commentArea}</p></>
        }
    </>)
}
export default Posts;