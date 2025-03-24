// GameBoard.jsx
import React from 'react';
import styles from './GameBoard.module.css';
import { Board } from '../../../../classes/Board';
import { useState } from 'react';

const GameBoard = () => {
  const [playerPosition, setPlayerPosition] = useState({x: 9, y: 1})

  return (
    <div className={styles.gameBoard}>
      {/* Background Image */}
      <img src= "src/assets/board.svg" alt="Game Board" className={styles.boardImage} style={{
        position: "relative",
      }}/>

      {/* Grid */}
      <div style={{position: "absolute", top: "54px"}}>
        {Board.BOARD.map((row, rowKey) => (
          <div style={{display: "flex", flexDirection: "row"}}>
            {row.map((cell, colKey) => (
              <div style={{
                position: "relative",
                width: "24px",
                height: "24px",
                backgroundColor: (playerPosition.y === rowKey
                                && playerPosition.x === colKey)
                                ? "#a0f" : "#fff", // visual representation of player
                borderWidth: "2px",
                borderColor: "#000",
                borderStyle: "solid",
                fontSize: "8px",
                visibility: cell? "visible" : "hidden"
              }}
                onClick={(e) => {
                  e.preventDefault()
                  if (Math.abs(playerPosition.x - colKey) + Math.abs(playerPosition.y - rowKey) <= 1) {
                    setPlayerPosition({x: colKey, y: rowKey})
                  }
                }}>
                  {rowKey},{colKey}
                </div>
            ))}
          </div>
        ))}
        {Board.PLACES.map(place =>
          <div key={place.key} style={{
            position: "absolute",
            left: place.xPos * 24,
            top: place.yPos * 24,
            background: "#fff",
            borderWidth: "2px",
            borderColor: "#000",
            borderStyle: "solid",
            fontSize: "8px",
          }}>
            {place.key}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;


