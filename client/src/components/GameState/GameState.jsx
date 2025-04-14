// GameState.jsx
import React, { useState } from 'react';
import styles from './GameState.module.css';
import GameBoard from './GameBoard';
import Controls from './Controls';
import CurrentPlayer from './CurrentPlayer';
import ClueInfoSheet from '../ClueInfoSheet'; // Import the ClueInfoSheet component

const GameState = ({ playerPositions }) => {
  const [isNotesOpen, setIsNotesOpen] = useState(false); // State for overlay visibility

  const handleNotesClick = () => {
    setIsNotesOpen(true); // Open the overlay
  };

  const handleCloseNotes = () => {
    setIsNotesOpen(false); // Close the overlay
  };

  return (
    <div className={styles.gameState}>
      <GameBoard playerPositions={playerPositions} />
      <div className={styles.rightSide}>
        <div className={styles.topRight}>
          <Controls onNotesClick={handleNotesClick} />
          <CurrentPlayer />
        </div>
      </div>
      {isNotesOpen && <ClueInfoSheet onClose={handleCloseNotes} />} {/* Conditionally render the ClueInfoSheet component */}
    </div>
  );
};

export default GameState;

