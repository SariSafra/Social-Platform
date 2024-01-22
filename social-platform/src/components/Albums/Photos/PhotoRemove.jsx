
const PhotoRemove = ({ photo, setCommentArea, setPhotos, photos }) => {
    const removePhoto = () => {
        const idToDelete = photo.id;
        fetch(`http://localhost:3000/photos/${idToDelete}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            setPhotos(photos.filter(photo => photo.id != idToDelete));
        }).catch(error => {
            console.error(error);
            setCommentArea("Server error. try again later.")
        });
    }

    return (<>
        <button className="actionButton" onClick={() => removePhoto()}>🗑️</button>
    </>)
}
export default PhotoRemove;