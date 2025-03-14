// Controls.jsx
import React from 'react';
import styles from './Controls.module.css';

const Controls = ({ onNotesClick }) => {
  const buttons = ['NOTES', 'PASSAGE', 'ROLL', 'ACCUSE', 'GUESS'];

  return (
    <div className={styles.controls}>
      {buttons.map((label, index) => (
        <button
          key={index}
          className={styles.button}
          onClick={label === 'NOTES' ? onNotesClick : null}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default Controls;
