import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { runId } from '../../Tools';

const PhotoAdd = ({ setCommentArea, setPhotos }) => {
    const [inAddition, setInAddition] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [url, setUrl] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const { albumId } = useParams();

    useEffect(() => {
        setNewTitle("");
        setUrl("");
        setThumbnailUrl("");
        setCommentArea("");
    }, [inAddition]);

    const AddPhoto = async (e) => {
        e.preventDefault();
        setInAddition(false);
        const newId = await runId("nextPhotoId");
        const newPhoto = { albumId: albumId, id: newId, title: newTitle, url: url, thumbnailUrl: thumbnailUrl }
        fetch('http://localhost:3000/photos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPhoto),
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            setCommentArea("");
            setPhotos((prev) => [...prev, newPhoto]);
        }).catch(error => {
            console.error(error);
            setCommentArea("Server error. try again later.")
        })
    }

    return (<>
        <button className="addButton" onClick={() => { setInAddition((prev) => !prev) }}>New Photo</button>
        {inAddition && (
            <form onSubmit={AddPhoto}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" value={newTitle} onChange={(event) => { setNewTitle(event.target.value) }} required />
                <label htmlFor="url">Url:</label>
                <input type="url" id="url" value={url} onChange={(event) => { setUrl(event.target.value) }} required />
                <label htmlFor="thumbnailUrl">Thumbnail Url:</label>
                <input type="url" id="thumbnailUrl" value={thumbnailUrl} onChange={(event) => { setThumbnailUrl(event.target.value) }} required />
                <button className="actionButton" type="submit">Add</button>
            </form>
        )}
    </>)
}
export default PhotoAdd;