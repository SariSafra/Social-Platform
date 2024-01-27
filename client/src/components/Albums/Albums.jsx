import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AlbumsDisplay from "./AlbumsDisplay";
import AlbumAdd from "./AlbumAdd";

const Albums = () => {
    const { userId } = useParams();
    const [albums, setAlbums] = useState([]);
    const [commentArea, setCommentArea] = useState("")

    useEffect(() => {
        requestUserAlbums();
    }, [])

    const requestUserAlbums = () => {
        fetch(`http://localhost:3000/albums/?userId=${Number(userId)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (Object.keys(data).length === 0) {
                    setCommentArea("You have no albums.");
                } else {
                    setAlbums(data);
                }
            })
            .catch(error => {
                console.error(error);
                setCommentArea("Server error. try again later.")
            });
    }
    return (<>
        <h2 className="title">Albums</h2>
        <AlbumAdd albums={albums} setAlbums={setAlbums} setCommentArea={setCommentArea} /><br />
        <AlbumsDisplay albums={albums} setAlbums={setAlbums} />
        <p className='commentArea'>{commentArea}</p>
    </>)
}
export default Albums;