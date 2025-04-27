// GameState.jsx
import React, { useState } from 'react';
import styles from './GameState.module.css';
import GameBoard from './GameBoard';
import Controls from './Controls';
import CurrentPlayer from './CurrentPlayer';
import ClueInfoSheet from '../ClueInfoSheet'; // Import the ClueInfoSheet component

const GameState = ({ playerPositions, movePlayerToPlace, movePlayerToCell, role, currentPlayer, cards, buttons, spacesToMove }) => {
  const [isNotesOpen, setIsNotesOpen] = useState(false); // State for overlay visibility
  // const mappableCards = cards.map(({ id, type }) => ({key: id, imageSource: `./assets/${type}Cards/${id}.svg`}))

  const handleNotesClick = () => {
    setIsNotesOpen(true); // Open the overlay
  };

  const handleCloseNotes = () => {
    setIsNotesOpen(false); // Close the overlay
  };

  const buttonsWithNotes = [
    {label: 'NOTES', onClick: handleNotesClick, disabledCondition: false},
    ...buttons
  ]

  return (
    <div className={styles.gameState}>
      <GameBoard
        playerPositions={playerPositions}
        movePlayerToPlace={movePlayerToPlace}
        movePlayerToCell={movePlayerToCell} />
      <div className={styles.rightSide}>
        <div className={styles.topRight}>
          <Controls buttons={buttonsWithNotes} spacesToMove={spacesToMove} isUserTurn={role == currentPlayer} />
          {cards.map(card => (
            <img src={`./src/assets/${card.type}Cards/${card.id}.svg`} key={card.id} height={"160px"}/>
          ))}
          <CurrentPlayer currentPlayer={currentPlayer} role={role} />
        </div>
      </div>
      {isNotesOpen && <ClueInfoSheet onClose={handleCloseNotes} />} {/* Conditionally render the ClueInfoSheet component */}
    </div>
  );
};

export default GameState;

