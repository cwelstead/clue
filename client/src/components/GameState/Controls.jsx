// Controls.jsx
import React from 'react';
import styles from './Controls.module.css';

const Controls = ({ buttons, spacesToMove }) => {

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
      {spacesToMove > 0 &&
        <p style={{
          textAlign: 'left'
        }}
        >
          {spacesToMove} spaces left to move!
        </p>
      }
    </div>
  );
};

export default Controls;
