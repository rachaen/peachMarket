import React from 'react';

const Images = ({ detailImages }) => {
  return (
    <>
      {detailImages.map((url) => {
        return <img alt={url} key={url} src={url} />;
      })}
    </>
  );
};

export default Images;
