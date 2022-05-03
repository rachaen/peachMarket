import React from 'react';

const Images = ({ imageList, getImageList, deleteImages, addImages }) => {
  const removeImage = (id) => {
    let newList = imageList.filter((image) => image.id !== id);
    getImageList(newList);
    return;
  };

  const BASEURL = 'http://localhost:8080/public/uploads';

  return imageList.map((image) => {
    return (
      <div className="photoBox" key={image}>
        <img src={`${BASEURL}${image}`} alt={image} key={image} className="grid__img" />
        <button onClick={() => removeImage(image.id)}>삭제</button>
      </div>
    );
  });
};

export default Images;
