
const PostUpdate = ({ postToUpdate, setPosts, posts, updatedTitle, updatedBody, setInUpdate, inUpdate, setCommentArea }) => {

    const updatePost = () => {
        setInUpdate(false);
        if (postToUpdate.title === updatedTitle && postToUpdate.body === updatedBody)
            return;
        const updatedFields = { title: updatedTitle, body: updatedBody };
        fetch(`http://localhost:3000/posts/${postToUpdate.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFields),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                const updatedPost = { ...postToUpdate, ["title"]: updatedTitle, ["body"]: updatedBody };
                setPosts(posts.map(post => post.id === postToUpdate.id ? updatedPost : post));
                setCommentArea("");
            }).catch(error => {
                console.error(error);
                setCommentArea("Server error. try again later.")
            });
    }

    return (<>
        <button className="actionButton" onClick={() => setInUpdate(true)}>🖊️</button>
        {inUpdate && <button className="actionButton" onClick={() => updatePost()}>✔️</button>}
    </>)
}
export default PostUpdate;