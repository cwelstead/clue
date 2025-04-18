import React, { useLayoutEffect, useRef, useState } from 'react';
import styles from './GameBoard.module.css';
import Board from '../../../../classes/Board.js';

const roleColors = new Map([
  ['Adam', 'red'],
  ['Dr Cooper', 'green'],
  ['Bob', 'purple'],
  ['Val', 'blue'],
  ['Firestone', 'yellow'],
  ['Theresa', 'white']
])

const GameBoard = ({ playerPositions, movePlayerToPlace, movePlayerToCell }) => {
  const cellSize = 24 // TODO make these adjust dynamically
  const cellBorder = 1
  const placeScale = cellSize + 2 * cellBorder

  return (
    <div className={styles.gameBoard} style={{display: 'flex', alignItems: 'stretch', position: 'relative', flex: '1'}}>
      {/* Grid */}
      <div style={{flex: '1'}}>

        {/* Places */}
        {Board.PLACES.map(place =>
          <div key={place.key} style={{
            position: "absolute",
            left: `${place.xPos * placeScale}%`,
            top: '',
            width: '',
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
            {Array.from(playerPositions, ([role, position]) =>  (
              position.place === place.key &&
              <img key={role}
                style={{
                  height: cellSize,
                  position: "relative",
                  margin: 'auto',
                }}
                src={`./src/assets/pieceIcons/piece-${roleColors.get(role)}.png`}>
              </img>
            ))}
          </div>
        )}
        <div style={{display: 'flex', flex: '1', flexDirection: 'column', alignContent: 'stretch', height: '100vh', maxWidth: '100%', maxHeight: '100%'}}>
        {/* Cells */}
        {Board.BOARD.map((row, rowKey) => (
          <div key={rowKey} style={{display: 'flex', flex: '1 1 100%', flexDirection: 'row', alignContent: 'stretch', maxWidth: '100%', maxHeight: '100%'}}>
            {row.map((cell, colKey) => (
              <div key={`${colKey},${rowKey}`} style={{
                position: "relative",
                flex: '1',
                maxWidth: '100%',
                maxHeight: '100%',
                backgroundColor: "#dbd8c6",
                borderWidth: '1px',//`${cellBorder}px`,
                borderColor: "#7e7f82",
                borderStyle: "solid",
                fontSize: "8px",
                visibility: cell? "visible" : "hidden",
                objectFit: 'contain',
                alignItems: 'center',
              }}
                onClick={(e) => {
                  e.preventDefault()
                  movePlayerToCell(colKey, rowKey)
                }}>
                  {/* {`${colKey}, ${rowKey}`} */}
                  {Array.from(playerPositions, ([role, position]) => (
                    position.x === colKey && position.y === rowKey &&
                    <img key={role}
                      style={{
                        objectFit: 'contain',
                        maxWidth: '60%',
                        maxHeight: '100%',
                        alignSelf: 'center',
                        margin: 'auto',
                      }}
                      src={`./src/assets/pieceIcons/piece-${roleColors.get(role)}.png`}>
                    </img>
                  ))}
                </div>
            ))}
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;


