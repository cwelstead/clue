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

const CurrentPlayer = ({ currentPlayer, role }) => {
  return (
    <div className={styles.currentPlayer}>
      {currentPlayer == role &&
      <button className={styles.button}>
        It's your turn!
        <img
            style={{
              margin: '0 5%',
              height: '150%',
            }}
            src={`./src/assets/pieceIcons/piece-${roleColors.get(currentPlayer)}.png`}
            alt={`${roleColors.get(currentPlayer)} game piece indicating current player`}>
          </img>
      </button>
      }
      {currentPlayer != role &&
        <button className={styles.button}>
          Current Player:
          <img
            style={{
              margin: '0 5%',
              height: '150%',
            }}
            src={`./src/assets/pieceIcons/piece-${roleColors.get(currentPlayer)}.png`}
            alt={`${roleColors.get(currentPlayer)} game piece indicating current player`}>
          </img>
        </button>
      }
    </div>
  );
};

export default CurrentPlayer;

