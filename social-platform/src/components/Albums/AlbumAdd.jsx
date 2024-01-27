import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { runId } from "../Tools";

const AlbumAdd = ({ setAlbums, albums, setCommentArea }) => {
    const [inAddition, setInAddition] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const { userId } = useParams();

    useEffect(() => {
        setNewTitle("");
        setCommentArea("");
        
    }, [inAddition]);

    const AddAlbum = async (e) => {
        e.preventDefault();
        setInAddition(false);
        const newId = await runId("nextAlbumId");
        const newAlbum = { userId: userId, id: newId, title: newTitle }
        fetch('http://localhost:3000/albums', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAlbum),
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            setAlbums([...albums, newAlbum]);
            setCommentArea("");
        }).catch(error => {
            console.error(error);
            setCommentArea("Server error. try again later.")
        })
    }

    return (<>
        <button className="addButton" onClick={() => { setInAddition((prev) => !prev) }}>New Album</button>
        {inAddition && (
            <form onSubmit={AddAlbum}>
                <label htmlFor="title">title</label>
                <input type="text" id="title" value={newTitle} onChange={(event) => { setNewTitle(event.target.value) }} required />
                <button className="addButton" type="submit">Add</button>
            </form>
        )}
    </>)
}
export default AlbumAdd;