import { useState, useEffect } from "react";
import PhotoRemove from './PhotoRemove';
import CommentUpdate from './PhotoUpdate'

const PhotoDisplay = ({ photo, photos, setPhotos }) => {

  const [updatedTitle, setUpdatedTitle] = useState(photo.title);
  const [inUpdate, setInUpdate] = useState(false);
  const [commentArea, setCommentArea] = useState("");

  useEffect(() => {
    setUpdatedTitle(photo.title);
  }, [inUpdate]);

  return (
    <>
      <pre>ID: {photo.id}</pre>
      <img src={photo.thumbnailUrl} alt={photo.title} style={{ maxWidth: '100%' }} /><br/>
      <h4>{inUpdate ?
        <textarea type="text"
          value={updatedTitle}
          onChange={(event) => { setUpdatedTitle(event.target.value) }}
          required
          style={{ width: "500px", fontWeight: "bold", fontSize: "16px" }} /> :
        photo.title}</h4>
        
      <PhotoRemove photo={photo} setCommentArea={setCommentArea} setPhotos={setPhotos} photos={photos} />
      <CommentUpdate inUpdate={inUpdate} setInUpdate={setInUpdate} photoToUpdate={photo} setCommentArea={setCommentArea}
        photos={photos} setPhotos={setPhotos} updatedTitle={updatedTitle} />
      <p style={{ color: 'red' }}>{commentArea}</p>
    </>
  );
};

export default PhotoDisplay;