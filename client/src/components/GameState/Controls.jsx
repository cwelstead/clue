// Controls.jsx
import React from 'react';
import styles from './Controls.module.css';

const Controls = ({ buttons, spacesToMove, isUserTurn, suggestState }) => {

  return (
    <div className={styles.controls}>
      {buttons.map(({ label, onClick, disabledCondition }) => (
        <button
          key={label}
          className={styles.button}
          onClick={onClick}
          disabled={disabledCondition}
        >
          {label}
        </button>
      ))}
      {(isUserTurn && spacesToMove > 0) &&
        <p style={{
          textAlign: 'left'
        }}
        >
          {spacesToMove} spaces left to move!
        </p>
      }
      {/* Suggestion dialogs (can be placeholder) */}
      {suggestState.type == 'suggestion-alert' &&
        <p style={{
          textAlign: 'left'
        }}
        >
          {suggestState.source.role} has made a suggestion:{'\n'}
          {suggestState.guess.suspect.phrase} in {suggestState.guess.room.phrase} with {suggestState.guess.weapon.phrase}
        </p>
      }
      {suggestState.type == 'suggestion-proof-alert' &&
        <p style={{
          textAlign: 'left'
        }}
        >
          {suggestState.refuter.role} is showing a card to {suggestState.source.role}
        </p>
      }
      {suggestState.type == 'no-proof-alert' &&
        <p style={{
          textAlign: 'left'
        }}
        >
          No one could prove {suggestState.source.role} wrong with a suggestion of:{'\n'}
          {suggestState.guess.suspect.phrase} in {suggestState.guess.room.phrase} with {suggestState.guess.weapon.phrase}
        </p>
      }
    </div>
  );
};

export default Controls;
