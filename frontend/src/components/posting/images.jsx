import React from 'react';

/* const Images = ({ imageList, getImageList }) => {
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
}; */

const Images = ({ imageList, getImageList }) => {
  const removeImage = (index) => {
    console.log('remove!');
    let newList = imageList.splice(index, 1);
    getImageList(newList);
    return;
  };
  return imageList.map((image, index) => {
    return (
      <div className="photoBox" key={index}>
        <img alt={index} src={image.url} />
        <button onClick={() => removeImage(index)}>삭제</button>
      </div>
    );
  });
};

export default Images;
