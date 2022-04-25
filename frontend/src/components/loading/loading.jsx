import React, { useEffect } from 'react';
import styles from './loading.module.css';

const Loading = ({ loaded }) => {
  return (
    <>
      <div className={`${styles.modal} ${loaded ? '' : styles.visible} `}></div>
    </>
  );
};

export default Loading;
