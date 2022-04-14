import React from 'react';

const Images = ({ imageList, getImageList }) => {
  const removeImage = (id) => {
    let newList = imageList.filter((image) => image.id !== id);
    getImageList(newList);
    return;
  };
  return imageList.map((image) => {
    return (
      <div className="photoBox" key={image.id}>
        <img alt={image.id} src={image.url} />
        <button onClick={() => removeImage(image.id)}>삭제</button>
      </div>
    );
  });
};

export default Images;
