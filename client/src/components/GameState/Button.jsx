// Button.jsx
import React from 'react';
import styles from './Button.module.css';

const Button = ({ label }) => {
  return <button className={styles.button}>{label}</button>;
};

export default Button;
