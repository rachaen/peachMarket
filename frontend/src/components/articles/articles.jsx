import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createStore } from 'redux';
import reducer from '../../_reducers/index';
import ArticlesTemp from './articlesTemp';

const Articles = () => {
  let { postId } = useParams();
  let store = createStore(reducer);
  useEffect(() => {
    store.dispatch({ type: 'visibleSpinner', containerName: 'articles' });
    console.log(store.getState());
  });
  return (
    <>
      <ArticlesTemp postId={postId} />
    </>
  );
};

export default Articles;
