import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate,useParams } from "react-router-dom";
import { useState, createContext, useContext, useEffect, useHistory } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import PhotosAdd from './PhotosAdd';
import PhotoDisplay from './PhotoDisplay'

const Photos = () => {

    const [photos, setPhotos] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [commentArea, setCommentArea] = useState("")

    const {albumId}=useParams()

    useEffect(() => {
        const delayedRequest = setTimeout(() => {
            requestPostsPhotos();
        }, 1500);
        return () => clearTimeout(delayedRequest);
    }, [hasMore]); 

    // useEffect(() => {
    //     requestPostsPhotos();
    // }, [])

    const requestPostsPhotos = async () => {
        fetch(`http://localhost:3000/photos?_page=${page}&_limit=8&albumId=${albumId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                return response.json();
            })
            .then(newPhotos => {
                if (newPhotos.length === 0) {
                    setHasMore(false);
                    setCommentArea("This Album has no Photos.")
                    return;
                } else {
                    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
                    setPage((prevPage) => prevPage + 1);
                }
            })
            .catch(error => {
                console.error(error);
                setCommentArea("Server error. try again later.")
            });
    };

    return (
        <div>
            <h2>Photos of Album number: {albumId}</h2>
            <p style={{ color: 'red' }}>{commentArea}</p>
            <PhotosAdd setCommentArea={setCommentArea}/>
            <InfiniteScroll
                dataLength={photos.length}
                next={requestPostsPhotos}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
            >
                {photos.map((photo) => (
                    <PhotoDisplay key={photo.id} photo={photo} photos={photos} setPhotos={setPhotos} />
                ))}
            </InfiniteScroll>
        </div>
    )
}
export default Photos;