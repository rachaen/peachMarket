import React from 'react';
import { Portal } from 'react-portal';
import Loading from './loading';

const SpinnerLoader = ({ isLoading, containerName }) => {
  return (
    <Portal node={document.getElementsByClassName(containerName)[0]}>
      <Loading className="spinner" loaded={!isLoading} />
    </Portal>
  );
};

export default SpinnerLoader;
