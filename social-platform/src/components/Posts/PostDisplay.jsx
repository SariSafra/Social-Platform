import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import PostRemove from './PostRemove';
import PostUpdate from './PostUpdate';
import Comments from './Comments/Comments';

const PostDisplay = ({ postToDisplay, setPosts, posts, filterOption }) => {
    const { userId } = useParams();

    const [showMore, setShowMore] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(postToDisplay.title);
    const [updatedBody, setUpdatedBody] = useState(postToDisplay.body);
    const [inUpdate, setInUpdate] = useState(false);
    const [commentArea, setCommentArea] = useState("")

    useEffect(() => {
        setUpdatedBody(postToDisplay.body);
        setUpdatedTitle(postToDisplay.title);
        inUpdate && setShowMore(true);
    }, [inUpdate]);

    return (<>
        <div>
            <ul className='list'>
                {filterOption !== "My Posts" &&
                    <li><strong>User Id:</strong> {postToDisplay.userId} </li>
                }
                <li><strong>id:</strong> {postToDisplay.id}</li>
                <li><strong>title:</strong> {inUpdate ?
                    <textarea type="text" value={updatedTitle} onChange={(event) => { setUpdatedTitle(event.target.value) }} required style={{ width: "350px" }} /> :
                    postToDisplay.title}</li>
                {showMore &&
                    <li><strong>body:</strong> {inUpdate ?
                        <textarea type="text" value={updatedBody} onChange={(event) => { setUpdatedBody(event.target.value) }} required style={{ width: "350px", height: "70px" }} /> :
                        postToDisplay.body}</li>
                }
            </ul>
            <strong><button className="actionButton" onClick={() => setShowMore(!showMore)}>{showMore ? '-' : '+'}</button></strong>
            {postToDisplay.userId === userId &&
                <><PostUpdate inUpdate={inUpdate} setInUpdate={setInUpdate} postToUpdate={postToDisplay} setCommentArea={setCommentArea}
                    setPosts={setPosts} posts={posts} updatedTitle={updatedTitle} updatedBody={updatedBody} />
                    <PostRemove postToRemove={postToDisplay} setPosts={setPosts} posts={posts} setCommentArea={setCommentArea} /><br /></>}
            {showMore && <button className="actionButton" onClick={() => setShowComments((prev) => !prev)}>{showComments ? 'Hide comments' : 'Show Comments'}</button>}
            {showComments && showMore && <Comments postId={postToDisplay.id} />}
        </div>
        {<p className='commentArea'>{commentArea}</p>}
    </>
    );
};

export default PostDisplay;