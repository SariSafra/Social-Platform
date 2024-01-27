
const CommentRemove = ({ commentToRemove, setCommentArea, setComments, comments }) => {

    const removeComment = () => {
        const idToDelete = commentToRemove.id;
        fetch(`http://localhost:3000/comments/${idToDelete}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            setComments(comments.filter(comment => comment.id !== idToDelete));
        }).catch(error => {
            console.error(error);
            setCommentArea("Server error. try again later.")
        });
    }

    return (<>
        <button className="actionButton" onClick={() => removeComment()}>🗑️</button>
    </>)
}
export default CommentRemove;