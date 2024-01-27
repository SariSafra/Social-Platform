
const PostRemove = ({ postToRemove, setPosts, posts, setCommentArea }) => {
    const idToDelete = postToRemove.id;

    const removePostAndPostsComments = () => {
        getPostsCommentsIds();
    }

    const getPostsCommentsIds = () => {
        fetch(`http://localhost:3000/comments/?postId=${Number(idToDelete)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (Object.keys(data).length === 0) {
                    removePost();
                } else {
                    removePostsComments(data);
                }
            })
            .catch(error => {
                console.error(error);
                setCommentArea("Server error. try again later.")
            });
    }

    const removePostsComments = async (comments) => {
        await comments.forEach(comment => {
            fetch(`http://localhost:3000/comments/${comment.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
            }).catch(error => {
                console.error(error);
                setCommentArea("Server error. try again later.");
            });
        })
        removePost();
    }

    const removePost = () => {
        fetch(`http://localhost:3000/posts/${idToDelete}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            setPosts(posts.filter(post => post.id !== idToDelete));
        }).catch(error => {
            console.error(error);
            setCommentArea("Server error. try again later.")
        });
    }

    return (<>
        <button className="actionButton" onClick={() => removePostAndPostsComments()}>🗑️</button>
    </>)
}
export default PostRemove;