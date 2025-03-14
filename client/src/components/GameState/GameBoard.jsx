// GameBoard.jsx
import React from 'react';
import styles from './GameBoard.module.css';

const GameBoard = () => {
  return (
    <div className={styles.gameBoard}>
      <img src= "src/assets/board.svg" alt="Game Board" className={styles.boardImage} />
    </div>
  );
};

export default GameBoard;


