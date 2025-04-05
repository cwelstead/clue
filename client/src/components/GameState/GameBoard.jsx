// GameBoard.jsx
import React from 'react';
import styles from './GameBoard.module.css';
import { Board } from '../../../../classes/Board';
import { useState } from 'react';

const GameBoard = () => {
  const [playerPosition, setPlayerPosition] = useState({x: 9, y: 0, place:""})
  const placeScale = 1.2
  const cellSize = 24

  function movePlayerToCell(destX, destY) {
    if (playerPosition.x >= 0 && playerPosition.y >= 0) {
      if (Math.abs(playerPosition.x - destX) + Math.abs(playerPosition.y - destY) <= 1) {
        setPlayerPosition({x: destX, y: destY, place: ""})
      }
    } else if (playerPosition.place) {
      Board.PLACES.forEach(place => {
        if (playerPosition.place == place.key) {
          place.adjacentSpaces.forEach(exit => {
            if (exit.x == destX && exit.y == destY) {
              setPlayerPosition({x: destX, y: destY, place: ""})
              console.log("Leaving place: " + place.key)
            }
          })
        }
      })
    } else {
      console.warn("Player didn't have a valid position, nor was it in a place. By all definitions they are in limbo.")
    }
  }

  function movePlayerToPlace(destPlace) {
    Board.PLACES.forEach(place => {
      if (destPlace == place.key) {
        place.adjacentSpaces.forEach(exit => {
          console.log(`Exit: ${exit.x},${exit.y} Location: ${playerPosition.x},${playerPosition.y}`)
          if (exit.x == playerPosition.x && exit.y == playerPosition.y) {
            setPlayerPosition({x: -1, y: -1, place: destPlace})
            console.log("Moving player to place: " + place.key)
          }
        })
      }
    })
  }

  return (
    <div className={styles.gameBoard}>
      {/* Background Image */}
      <img src= "src/assets/board.svg" alt="Game Board" className={styles.boardImage} style={{
        position: "relative",
      }}/>

      {/* Grid */}
      <div style={{position: "absolute", top: "54px"}}>
        {Board.BOARD.map((row, rowKey) => (
          <div key={rowKey} style={{display: "flex", flexDirection: "row"}}>
            {row.map((cell, colKey) => (
              <div key={colKey} style={{
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
                  movePlayerToCell(colKey, rowKey)
                }}>
                  {colKey},{rowKey}
                </div>
            ))}
          </div>
        ))}
        {Board.PLACES.map(place =>
          <img key={place.key} style={{
            position: "absolute",
            left: place.xPos * cellSize, // TODO: replace all magic numbers with dynamic variables
            top: place.yPos * cellSize,
            maxWidth: place.width * placeScale * cellSize,
            maxHeight: place.height * placeScale * cellSize,
          }}
            src={place.img}
            onClick={(e) => {
              e.preventDefault()
              movePlayerToPlace(place.key)
            }}
          ></img>
        )}
      </div>
    </div>
  );
};

export default GameBoard;


