import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PostAdd from "./PostAdd";
import PostsDisplay from "./PostsDisplay";

const Posts = () => {
    const { userId } = useParams();
    const [posts, setPosts] = useState([]);
    const [commentArea, setCommentArea] = useState("")

    useEffect(() => {
        requestPosts();
    }, [])

    const requestPosts = () => {
        fetch(`http://localhost:3000/posts`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (Object.keys(data).length === 0) {
                    setCommentArea("There is no posts.");
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
        <h2 className="title">Posts</h2>
        <PostAdd setPosts={setPosts} posts={posts} setCommentArea={setCommentArea} /><br />
        <PostsDisplay setPosts={setPosts} posts={posts} />
        <p className='commentArea'>{commentArea}</p>
    </>)
}
export default Posts;