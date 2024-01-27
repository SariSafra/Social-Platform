
const PhotoUpdate = ({ setInUpdate, photoToUpdate, setCommentArea, setPhotos, photos, updatedTitle, inUpdate }) => {

    const updatePhoto = () => {
        setInUpdate(false);
        if (photoToUpdate.title === updatedTitle)
            return;
        const updatedField = { title: updatedTitle };
        fetch(`http://localhost:3000/photos/${photoToUpdate.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedField),
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            const updatedPhoto = { ...photoToUpdate, ["title"]: updatedTitle };
            setPhotos(photos.map(photo => photo.id === photoToUpdate.id ? updatedPhoto : photo));
            setCommentArea("");
        }).catch(error => {
            console.error(error);
            setCommentArea("Server error. try again later.")
        });
    }

    return (<>
        <button className="actionButton" onClick={() => setInUpdate(true)}>🖊️</button>
        {inUpdate && <button className="actionButton" onClick={() => updatePhoto()}>✔️</button>}
    </>)
}
export default PhotoUpdate;