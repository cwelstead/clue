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
  const placeOffsetLeft = 1.8
  const placeOffsetTop = 1.8

  return (
    <div className={styles.gameBoard} style={{display: 'flex', position: 'relative', flex: '1', aspectRatio: '1'}}>
      {/* Grid */}
      <div style={{flex: '1', aspectRatio: '1', position: 'relative',}}>
        {/* Places */}
        {Board.PLACES.map(place =>
          <div key={place.key} style={{
            position: "absolute",
            left: `${place.xPos * 4 + placeOffsetLeft}%`,
            top: `${place.yPos * 3.77 + placeOffsetTop}%`,
            width: `${place.width * 4.05}%`,
            height: `${place.height * 3.8}%`,
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
                  height: '20%',
                  position: "relative",
                  margin: 'auto',
                }}
                src={`./src/assets/pieceIcons/piece-${roleColors.get(role)}.png`}>
              </img>
            ))}
          </div>
        )}
        <div style={{display: 'flex', flex: '1', flexDirection: 'column', alignContent: 'stretch', height: '100vh', maxWidth: '100%', maxHeight: '100%', backgroundColor: '#702023', paddingLeft: '2%', paddingTop: '2%', paddingBottom: '4%'}}>
        {/* Cells */}
        {Board.BOARD.map((row, rowKey) => (
          <div key={rowKey} style={{display: 'flex', flex: '1 1 100%', flexDirection: 'row', alignContent: 'stretch', maxHeight: '100%'}}>
            {row.map((cell, colKey) => (
              <div key={`${colKey},${rowKey}`} style={{
                position: "relative",
                flex: '-1',
                aspectRatio: '1/1',
                backgroundColor: "#c4a67d",
                borderWidth: '1px',
                borderColor: "#7e7f82",
                borderStyle: "solid",
                fontSize: "8px",
                visibility: cell? "visible" : "hidden",
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
                        minHeight: '100%',
                        height: '0',
                        alignSelf: 'center',
                        margin: '0',
                        flex: '1',
                        
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


