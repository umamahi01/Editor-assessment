import React from 'react';
import { convertToRaw } from 'draft-js';
import './Button.css';
const Button = ({ editorState }) => {
  const saveContent = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    localStorage.setItem('editorContent', JSON.stringify(rawContentState));
    // alert('Content saved to local storage!');
  };

  return (
    <div className="button-container">
      <button className="save-btn" onClick={saveContent}>Save</button>
    </div>
  );
}

export default Button;
