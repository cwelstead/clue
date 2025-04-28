// GameState.jsx
import React, { useState } from 'react';
import styles from './GameState.module.css';
import GameBoard from './GameBoard';
import Controls from './Controls';
import CurrentPlayer from './CurrentPlayer';
import ClueInfoSheet from '../ClueInfoSheet'; // Import the ClueInfoSheet component
import Guess from './Guess';

const GameState = ({ playerPositions, movePlayerToPlace, movePlayerToCell, role, currentPlayer, cards, spacesToMove, rollDice, sendGuess, endTurn }) => {
  const [isNotesOpen, setIsNotesOpen] = useState(false) // State for overlay visibility
  const [isGuessOpen, setIsGuessOpen] = useState(false)
  const [lastSuggest, setLastSuggest] = useState("")
  const [guessType, setGuessType] = useState("")

  const handleNotesClick = () => {
    setIsNotesOpen(true) // Open the overlay
  };

  const handleCloseNotes = () => {
    setIsNotesOpen(false) // Close the overlay
  };

  const handleCloseGuess = () => {
    setIsGuessOpen(false)
    setGuessType("")
  }

  function openSuggest() {
    setGuessType("SUGGEST")
    setIsGuessOpen(true)
  }

  function openAccuse() {
    setGuessType("ACCUSE")
    setIsGuessOpen(true)
  }

  function makeGuess(suspect, weapon, room) {
    setLastSuggest(playerPositions.get(role).place)
    sendGuess({room: room, suspect: suspect, weapon: weapon}, guessType)
    handleCloseGuess()
  }

  function startRoll() {
    setLastSuggest("")
    rollDice()
  }

  const buttons = [
    {label: 'NOTES', onClick: handleNotesClick, disabledCondition: false},
    {label: 'PASSAGE', onClick: null, disabledCondition: true  || spacesToMove > 0},
    {label: 'ROLL', onClick: startRoll, disabledCondition: spacesToMove >= 0 || role != currentPlayer},
    {label: 'SUGGEST', onClick: openSuggest, disabledCondition: (playerPositions && (!playerPositions.get(role).place || playerPositions.get(role).place == lastSuggest)) || role != currentPlayer || spacesToMove > 0},
    {label: 'ACCUSE', onClick: openAccuse, disabledCondition: (playerPositions && playerPositions.get(role).place != "Kauffman Clue") || role != currentPlayer || spacesToMove > 0},
    {label: 'END TURN', onClick: endTurn, disabledCondition: role != currentPlayer}
  ];

  return (
    <div className={styles.gameState}>
      <GameBoard
        playerPositions={playerPositions}
        movePlayerToPlace={movePlayerToPlace}
        movePlayerToCell={movePlayerToCell} />
      <div className={styles.rightSide}>
        <div className={styles.topRight}>
          <Controls buttons={buttons} spacesToMove={spacesToMove} isUserTurn={role == currentPlayer} />
          {cards.map(card => (
            <img src={`./src/assets/${card.type}Cards/${card.id}.svg`} key={card.id} height={"160px"}/>
          ))}
          <CurrentPlayer currentPlayer={currentPlayer} role={role} />
        </div>
      </div>
      {isNotesOpen && <ClueInfoSheet onClose={handleCloseNotes} />} {/* Conditionally render the ClueInfoSheet component */}
      {isGuessOpen && <Guess onClose={handleCloseGuess} guessType={guessType} makeGuess={makeGuess}/>}
    </div>
  );
};

export default GameState;

