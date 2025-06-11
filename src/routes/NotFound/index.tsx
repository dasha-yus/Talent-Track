import React from 'react';

import styles from './NotFound.module.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.block}>
      <h1>404</h1>
      <p className={styles.message}>Page not found</p>
      <p className={styles.text}>
        <a href="/">Click here</a> to be redirected to the homepage
      </p>
    </div>
  );
};

export default NotFoundPage;
