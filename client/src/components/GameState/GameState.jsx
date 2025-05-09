// GameState.jsx
import React, { useState } from 'react';
import { socket } from '../../socket';
import styles from './GameState.module.css';
import GameBoard from './GameBoard';
import Controls from './Controls';
import CurrentPlayer from './CurrentPlayer';
import ClueInfoSheet from '../ClueInfoSheet'; // Import the ClueInfoSheet component
import Guess from './Guess';
import RefutePopup from './RefutePopup';
import AlertPopup from './AlertPopup';

const GameState = ({ user, playerPositions, movePlayerToPlace, movePlayerToCell, role, currentPlayer, cards, spacesToMove, rollDice, sendGuess, suggestState, submitProof, endTurn }) => {
  const [isNotesOpen, setIsNotesOpen] = useState(false) // State for overlay visibility
  const [isGuessOpen, setIsGuessOpen] = useState(false)
  const [lastSuggest, setLastSuggest] = useState("")
  const [guessType, setGuessType] = useState("")

  // State to track which cards have been crossed off
  const [crossedOffCards, setCrossedOffCards] = useState({
    suspects: {},
    weapons: {},
    rooms: {}
  });

  const handleNotesClick = () => {
    setIsNotesOpen(true) // Open the overlay
  };

  const handleCloseNotes = () => {
    setIsNotesOpen(false) // Close the overlay
  };

  const passageMap = new Map([
    ["Selleck", "Mega Lounge"],
    ["Mega Lounge", "Selleck"],
    ["110", "112"],
    ["112", "110"],
  ])
  function usePassage() {
    socket.emit('force-place', {
      id: user.id,
      destPlace: passageMap.get(playerPositions.get(role).place)
    })
  }

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
    {label: 'PASSAGE', onClick: usePassage, disabledCondition: !(playerPositions.get(role).place == 'Mega Lounge'
                                                          || playerPositions.get(role).place == 'Selleck'
                                                          || playerPositions.get(role).place == '110'
                                                          || playerPositions.get(role).place == '112')
                                                          || role != currentPlayer
                                                          || spacesToMove != -1},
    {label: 'ROLL', onClick: startRoll, disabledCondition: spacesToMove >= 0 || role != currentPlayer},
    {label: 'SUGGEST', onClick: openSuggest, disabledCondition: (playerPositions 
                                                                && (!playerPositions.get(role).place || playerPositions.get(role).place == lastSuggest))
                                                                || role != currentPlayer || spacesToMove > 0},
    {label: 'ACCUSE', onClick: openAccuse, disabledCondition: (playerPositions && playerPositions.get(role).place != "Kauffman Clue")
                                                               || role != currentPlayer || spacesToMove > 0},
    {label: 'END TURN', onClick: endTurn, disabledCondition: role != currentPlayer}
  ];

  console.table({
    "user.id (myID)": user.id,
    "source.id": suggestState.source?.id,
    "source.role": suggestState.source?.role
  });

  return (
    <div className={styles.gameState}>
      <GameBoard
        playerPositions={playerPositions}
        movePlayerToPlace={movePlayerToPlace}
        movePlayerToCell={movePlayerToCell} />
      <div className={styles.rightSide}>
        <div className={styles.topRight}>
          <Controls buttons={buttons} spacesToMove={spacesToMove} isUserTurn={role == currentPlayer} suggestState={suggestState} />
          {cards.map(card => (
            <img src={`./src/assets/${card.type}Cards/${card.id}.svg`} key={card.id} height={"160px"} alt={`${card.type} card: ${card.id}`}/>
          ))}
          <CurrentPlayer currentPlayer={currentPlayer} role={role} />
        </div>
      </div>
      {isNotesOpen && <ClueInfoSheet onClose={handleCloseNotes} crossedOffCards={crossedOffCards} setCrossedOffCards={setCrossedOffCards} />} {/* Conditionally render the ClueInfoSheet component */}
      {isGuessOpen && <Guess onClose={handleCloseGuess} guessType={guessType} makeGuess={makeGuess} place={playerPositions.get(role).place}/>}
      {suggestState.type == 'select-proof' && <RefutePopup onSubmit={submitProof} cards={cards} suggestState={suggestState} />}
      {(suggestState.type === 'suggestion-proof-view' || suggestState.type === 'no-proof-view') && (
        <AlertPopup 
          onConfirm={endTurn}
          refuter={suggestState.type === 'suggestion-proof-view' ? suggestState.refuter : null}
          cardImage={suggestState.card ? `./src/assets/${suggestState.card.type}Cards/${suggestState.card.id}.svg` : undefined}
          sourceID={suggestState.source?.id}
          myID={user.id}
        />
      )}
    </div>
  );
};

export default GameState;

