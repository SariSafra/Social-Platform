import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate} from "react-router-dom";
import { useState, createContext, useContext, useEffect,useHistory } from "react";
import PostDisplay from "./PostDisplay";

const PostsDisplay=({posts, setPosts })=>{
    const [selectedId, setSelectedId] = useState("0");
    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedBody, setSelectedBody] = useState("");
    const [filterOption, setFilterOption] = useState("All");
    const [commentArea, setCommentArea] = useState("")

    useEffect(() => {
        setSelectedId("0");
        setSelectedTitle("");
        setSelectedBody("");
    }, [filterOption]);

    const isFiltered = (post) => {
        switch (filterOption) {
            case "All":
                return true;
            case "Id":
                return post.id === selectedId;
            case "Title":
                return post.title == selectedTitle;
            case "Body":
                return post.body == selectedBody;
        }
    }

    return( <>
        <label htmlFor="filterSelector">Choose a filter option:</label>
        <select id="filterSelector" value={filterOption} onChange={(event)=>{setFilterOption(event.target.value)}}>
            <option value="All">All</option>
            {/* <option value="User Id">User Id</option> */}
            <option value="Id">Id</option>
            <option value="Title">Title</option>
            <option value="Body">Body</option> 
        </select>
        {filterOption === 'Id' && (
           <><label htmlFor="idInput">Enter Id:</label>
                <input type="number" id="idInput" value={selectedId} onChange={(event)=>{setSelectedId(event.target.value)}} /></>
        )}
        {filterOption === 'Title' && (
            <><label htmlFor="titleInput">Enter Title:</label>
                <input type="text" id="titleInput" value={selectedTitle} onChange={(event)=>{setSelectedTitle(event.target.value)}} /></>
        )}
        {filterOption === 'Body' && (
            <><label htmlFor="bodyInput">Enter Body:</label>
                <input type="text" id="bodyInput" value={selectedBody} onChange={(event)=>{setSelectedBody(event.target.value)}} /></>
        )}
         <p style={{ color: 'red' }}>{commentArea}</p>
        <ul>
            {posts.map((post) => (
                <li key={post.id} style={{ listStyle: 'none', margin: '3rem' }}>
                    {isFiltered(post) ? <PostDisplay postToDisplay={post} setPosts={setPosts} posts={posts} setCommentArea={setCommentArea}/> : <span />}
                </li>
            ))}
    </ul>
    </>  )
}
export default PostsDisplay