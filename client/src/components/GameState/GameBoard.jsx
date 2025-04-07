// GameBoard.jsx
import React from 'react';
import styles from './GameBoard.module.css';
import { Board } from '../../../../classes/Board';
import { useState } from 'react';

const GameBoard = () => {
  const [playerPosition, setPlayerPosition] = useState({x: 9, y: 0, place:""})
  const cellSize = 27
  const cellBorder = 1
  const placeScale = cellSize + 2 * cellBorder

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
          if (exit.x == playerPosition.x && exit.y == playerPosition.y) {
            setPlayerPosition({x: -1, y: -1, place: destPlace})
          }
        })
      }
    })
  }

  return (
    <div className={styles.gameBoard} style={{position: 'relative',}}>
      {/* Background Image */}
      <img src= "src/assets/board.svg" alt="Game Board" className={styles.boardImage} style={{
        position: "relative",
      }}/>

      {/* Grid */}
      <div style={{position: "absolute", top: "54px"}}>

        {/* Places */}
        {Board.PLACES.map(place =>
          <div key={place.key} style={{
            position: "absolute",
            left: place.xPos * placeScale,
            top: place.yPos * placeScale,
            width: place.width * placeScale,
            height: place.height * placeScale,
            boxSizing: 'border-box',
            alignContent: 'center',
          }}>
            <img src={place.img} style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
            }}
                onClick={(e) => {
                e.preventDefault()
                movePlayerToPlace(place.key)
              }}
            ></img>
            
            {/* List of tokens in a room (just the player for now) */}
            {playerPosition.place == place.key && (
              <img
                style={{
                  height: cellSize,
                  position: "relative",
                  margin: 'auto',
                }}
                src='./src/assets//pieceIcons/piece-purple.png'>
              </img>
            )}
          </div>
        )}

        {/* Cells */}
        {Board.BOARD.map((row, rowKey) => (
          <div key={rowKey} style={{display: "flex", flexDirection: "row"}}>
            {row.map((cell, colKey) => (
              <div key={colKey} style={{
                position: "relative",
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                backgroundColor: "#dbd8c6",
                borderWidth: `${cellBorder}px`,
                borderColor: "#7e7f82",
                borderStyle: "solid",
                fontSize: "8px",
                visibility: cell? "visible" : "hidden",
                objectFit: 'contain'
              }}
                onClick={(e) => {
                  e.preventDefault()
                  movePlayerToCell(colKey, rowKey)
                }}>
                  {playerPosition.y === rowKey
                  && playerPosition.x === colKey &&
                    <img
                      style={{
                        height: cellSize,
                        objectFit: 'contain'
                      }}
                      src='./src/assets//pieceIcons/piece-purple.png'>
                    </img>
                  }
                </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;


