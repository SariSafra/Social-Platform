import { useState, createContext, useContext, useRef, useEffect} from "react";
import PhotoRemove from './PhotoRemove';

const PhotoDisplay = ({ photo, photos, setPhotos }) => {
  const [commentArea,setCommentArea]=useState("");

  return (
    <>
      <h4>{photo.title}</h4>
      <pre>ID: {photo.id}</pre>
      <PhotoRemove photo={photo} setCommentArea={setCommentArea} setPhotos={setPhotos} photos={photos}/><br/>
      <img src={photo.thumbnailUrl} alt={photo.title} style={{ maxWidth: '100%' }} />
      <p style={{ color: 'red' }}>{commentArea}</p>
    </>
  );
};

export default PhotoDisplay;