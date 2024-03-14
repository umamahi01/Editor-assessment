// Button.js
import React from 'react';
import './Button.css'; // Import CSS file for styling

const Button = ({ onClick, label }) => {
  return <button className="custom-button" onClick={onClick}>{label}</button>;
};

export default Button;
