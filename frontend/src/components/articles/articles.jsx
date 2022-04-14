import React from 'react';
import { useParams } from 'react-router-dom';

const Articles = () => {
  let { postId } = useParams();

  return (
    <>
      <div>{postId}</div>
    </>
  );
};

export default Articles;
