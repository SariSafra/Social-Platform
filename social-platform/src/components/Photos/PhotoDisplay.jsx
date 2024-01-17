import React from 'react';

const PhotoDisplay = ({ photo, photos, setPhotos }) => {
  return (
    <>
      <h5>{photo.title}</h5>
      <p>ID: {photo.id}</p>
      <img src={photo.thumbnailUrl} alt={photo.title} style={{ maxWidth: '100%' }} />
    </>
  );
};

export default PhotoDisplay;