// CurrentPlayer.jsx
import React from 'react';
import styles from './CurrentPlayer.module.css';

const roleColors = new Map([
  ['Adam', 'red'],
  ['Dr Cooper', 'green'],
  ['Bob', 'purple'],
  ['Val', 'blue'],
  ['Firestone', 'yellow'],
  ['Theresa', 'white']
])

const CurrentPlayer = ({ currentPlayer }) => {
  return (
    <div className={styles.currentPlayer}>
      <button className={styles.button}>
        {/* TODO: Say "It's your turn!" when currentPlayer is you */}
        Current Player:
        <img
          style={{
            margin: '0 5%',
            height: '150%',
          }}
          src={`./src/assets/pieceIcons/piece-${roleColors.get(currentPlayer)}.png`}>
        </img>
      </button>
    </div>
  );
};

export default CurrentPlayer;

