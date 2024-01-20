import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import PhotosAdd from './PhotosAdd';
import PhotoDisplay from './PhotoDisplay';

const Photos = () => {
    const [photos, setPhotos] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [start, setStart] = useState(0);
    const [commentArea, setCommentArea] = useState('');
    const limit = 8;
    const [lastFetchedPhotoId, setLastFetchedPhotoId] = useState(null);
    const { albumId } = useParams();
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/albums/${albumId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.userId !== userId) {
                    navigate('/');
                }
            })
            .catch(error => {
                console.error(error);
                setCommentArea('Error fetching max photo ID. Try again later.');
            });

    }, [])
    useEffect(() => {
        //getMaxPhotoId();
        requestPostsPhotos();
    }, [hasMore]);


    // const getMaxPhotoId=()=>{
    //      fetch(`http://localhost:3000/photos?albumId=${albumId}&_sort=id&_order=desc&_limit=1`)
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error(`Request failed with status: ${response.status}`);
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             const maxPhoto = data[0];
    //             setLastFetchedPhotoId(maxPhoto ? maxPhoto.id : null);  
    //         })
    //         .catch(error => {
    //             console.error(error);
    //             setCommentArea('Error fetching max photo ID. Try again later.');
    //         });

    // }
    const requestPostsPhotos = async () => {
        try {
            const response = await fetch(`http://localhost:3000/photos?albumId=${albumId}&_start=${start}&_limit=${limit}`);

            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            const newPhotos = await response.json();

            if (newPhotos.length === 0) {
                setHasMore(false);
                setCommentArea('This Album has no Photos.');
            } else {
                const filteredNewPhotos = newPhotos.filter(photo => photo.id > lastFetchedPhotoId);

                if (filteredNewPhotos.length === 0) {
                    setHasMore(false);
                    setCommentArea('All photos loaded.');
                } else {
                    const uniquePhotos = Array.from([...photos, ...filteredNewPhotos]);
                    const newMaxPhotoId = Math.max(...filteredNewPhotos.map(photo => photo.id));
                    setLastFetchedPhotoId(newMaxPhotoId);
                    setPhotos(uniquePhotos);
                    setStart((prevStart) => prevStart + limit);
                }
            }
        } catch (error) {
            console.error(error);
            setCommentArea('Server error. Try again later.');
        }
    };

    return (
        <div>
            <h2 className="title">Photos of Album number {albumId}</h2>
            <p style={{ color: 'red' }}>{commentArea}</p>
            <PhotosAdd setCommentArea={setCommentArea} setPhotos={setPhotos} />
            <InfiniteScroll
                dataLength={photos.length}
                next={requestPostsPhotos}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
            >
                <ul className="showAllPhotos">
                {photos.map((photo) => (
                    <div className="showPhoto"><PhotoDisplay key={photo.id} photo={photo} photos={photos} setPhotos={setPhotos} /></div>
                ))}
                </ul>
            </InfiniteScroll>
        </div>
    );
};

export default Photos;


