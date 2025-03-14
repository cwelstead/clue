// CurrentPlayer.jsx
import React from 'react';
import styles from './CurrentPlayer.module.css';

const CurrentPlayer = () => {
  return (
    <div className={styles.currentPlayer}>
      <button className={styles.button}>
        Current Player: <span className={styles.indicator}></span>
      </button>
    </div>
  );
};

export default CurrentPlayer;

