import {  Route} from "react-router-dom";
import { useState,useEffect } from "react";
import PostDisplay from "./PostDisplay";

const PostsDisplay = ({ posts, setPosts, personalOrOtherPosts }) => {
    const [selectedUserId, setSelectedUserId] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedBody, setSelectedBody] = useState("");
    const [filterOption, setFilterOption] = useState("All");
    const [commentArea, setCommentArea] = useState("")

    useEffect(() => {
        setSelectedUserId("");
        setSelectedId("");
        setSelectedTitle("");
        setSelectedBody("");
    }, [filterOption]);

    const isFiltered = (post) => {
        switch (filterOption) {
            case "All":
                return true;
            case "User Id":
                return post.userId.includes(selectedUserId);
            case "Id":
                return post.id.includes(selectedId);
            case "Title":
                return post.title.includes(selectedTitle);
            case "Body":
                return post.body.includes(selectedBody);
        }
    }

    return (<>
        <label className="selectorLabel" htmlFor="filterSelector">Choose a filter option: </label>
        <select className="selector" id="filterSelector" value={filterOption} onChange={(event) => { setFilterOption(event.target.value) }}>
            <option value="All">All</option>
            {personalOrOtherPosts === "other" && <option value="User Id">User Id</option>}
            <option value="Id">Id</option>
            <option value="Title">Title</option>
            <option value="Body">Body</option>
        </select>
        {filterOption === 'Id' && (
            <><label htmlFor="idInput">Enter Id:</label>
                <input type="number" id="idInput" value={selectedId} onChange={(event) => { setSelectedId(event.target.value) }} /></>
        )}
        {filterOption === 'User Id' && (
            <><label htmlFor="userIdInput">Enter User Id:</label>
                <input type="number" id="userIdInput" value={selectedUserId} onChange={(event) => { setSelectedUserId(event.target.value) }} /></>
        )}
        {filterOption === 'Title' && (
            <><label htmlFor="titleInput">Enter Title:</label>
                <input type="text" id="titleInput" value={selectedTitle} onChange={(event) => { setSelectedTitle(event.target.value) }} /></>
        )}
        {filterOption === 'Body' && (
            <><label htmlFor="bodyInput">Enter Body:</label>
                <input type="text" id="bodyInput" value={selectedBody} onChange={(event) => { setSelectedBody(event.target.value) }} /></>
        )}
        <p style={{ color: 'red' }}>{commentArea}</p>
        <ul className="showAllItems">
            {posts.map((post) => (
                <li key={post.id} className="list">
                    {isFiltered(post) && <div className="showItem"><PostDisplay postToDisplay={post} setPosts={setPosts} posts={posts} setCommentArea={setCommentArea} personalOrOtherPosts={personalOrOtherPosts}/></div>}
                </li>
            ))}
        </ul>
    </>)
}
export default PostsDisplay