import React, { useState, useEffect } from 'react';
import { Editor, EditorState, convertToRaw, convertFromRaw, ContentState, Modifier } from 'draft-js';
import './App.css'; // Import your CSS file for styling

import Title from './Components/Title';
import Button from './Components/Button';


function App() {
  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem('editorContent');
    return savedContent ? EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent))) : EditorState.createEmpty();
  });

  const handleEditorStatechange = (newEditorState) => {
    const contentState = newEditorState.getCurrentContent();
    const selectionState = newEditorState.getSelection();
    const currentBlockKey = selectionState.getStartKey();
    const currentBlock = contentState.getBlockForKey(currentBlockKey);
    const currentBlockText = currentBlock.getText().trim();
  
    let updatedEditorState = newEditorState;
  
    // Check if the current block starts with #
    if (currentBlockText.startsWith('# ') && selectionState.getAnchorOffset() === 2) {
      // Convert the current block to Heading 1 format
      const newContentState = Modifier.setBlockType(
        contentState,
        selectionState,
        'header-one'
      );
  
      // Remove '#' symbol and space from the block text
      const updatedBlockText = currentBlockText.substring(2);
      const updatedContentState = Modifier.replaceText(
        newContentState,
        selectionState.merge({
          anchorOffset: 0,
          focusOffset: currentBlockText.length,
        }),
        updatedBlockText
      );
  
      updatedEditorState = EditorState.push(newEditorState, updatedContentState, 'change-block-type');
    }
  
    setEditorState(updatedEditorState);
  };
  

  
  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    localStorage.setItem('editorContent', JSON.stringify(rawContentState));
  }, [editorState]);

  
  return (
    <div className="App">
      <div id='align-horizontal'>
      <Title className="title"/>
      {/* <Button onClick={handleSave} label="Save" /> */}
      <Button className="btn" editorState={editorState}  />
      </div>
      <div className="editor-container">
         <Editor
          editorState={editorState}
          onChange={handleEditorStatechange}
          
          readOnly={false}
        />
        
      </div>
    </div>
  );
}

export default App;
