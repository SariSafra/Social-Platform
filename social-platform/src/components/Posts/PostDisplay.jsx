import React, { useState, useEffect } from 'react';
import PostRemove from './PostRemove';
import PostUpdate from './PostUpdate';
import Comments from './Comments/Comments';

const PostDisplay = ({ postToDisplay, setPosts, posts, setCommentArea, personalOrOtherPosts }) => {
    const [showMore, setShowMore] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(postToDisplay.title);
    const [updatedBody, setUpdatedBody] = useState(postToDisplay.body);
    const [inUpdate, setInUpdate] = useState(false);

    useEffect(() => {
        setUpdatedBody(postToDisplay.body);
        setUpdatedTitle(postToDisplay.title);
        inUpdate && setShowMore(true);
    }, [inUpdate]);

    return (<>
        <div>
            <ul className='list'>
                {personalOrOtherPosts === "other" &&
                    <li>
                        <strong>User Id:</strong> {postToDisplay.userId}
                    </li>
                }
                <li>
                    <strong>id:</strong> {postToDisplay.id}
                </li>
                <li>
                    <strong>title:</strong> {inUpdate ?
                        <textarea type="text" value={updatedTitle} onChange={(event) => { setUpdatedTitle(event.target.value) }} required style={{ width: "350px" }} /> :
                        postToDisplay.title}
                </li>
                {showMore && (
                    <li>
                        <strong>body:</strong> {inUpdate ?
                            <textarea type="text" value={updatedBody} onChange={(event) => { setUpdatedBody(event.target.value) }} required style={{ width: "350px", height: "70px" }} /> :
                            postToDisplay.body}
                    </li>
                )}
            </ul>
            <strong><button className="actionButton" onClick={() => setShowMore(!showMore)}>{showMore ? '-' : '+'}</button></strong>
            {personalOrOtherPosts === "personal" &&
                <><PostUpdate inUpdate={inUpdate} setInUpdate={setInUpdate} postToUpdate={postToDisplay} setCommentArea={setCommentArea}
                    setPosts={setPosts} posts={posts} updatedTitle={updatedTitle} updatedBody={updatedBody} />
                    <PostRemove postToRemove={postToDisplay} setCommentArea={setCommentArea} setPosts={setPosts} posts={posts} /><br /><br /></>}
            {showMore && <button className="actionButton" onClick={() => setShowComments((prev) => !prev)}>{showComments ? 'hide comments' : 'Show Comments'}</button>}
            {showComments && showMore && <Comments postId={postToDisplay.id} />}
        </div>
    </>
    );
};

export default PostDisplay;