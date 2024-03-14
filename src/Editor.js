// Assuming this code is part of your Draft.js editor component

import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './Editor.css';

const DraftEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      handleEditorStateChange(newState);
      return 'handled';
    }

    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    let blockText = contentState.getBlockForKey(selectionState.getStartKey()).getText();

    // Handle Heading 1 formatting
    if (blockText.startsWith("# ")) {
      handleEditorStateChange(RichUtils.toggleBlockType(editorState, 'header-one'));
      blockText = blockText.substring(2); // Remove '#' from text
    }

    // Handle Bold text formatting
    if (blockText.endsWith("* ")) {
      handleEditorStateChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
      blockText = blockText.slice(0, -2); // Remove '* ' from text
    }

    // Handle Red line formatting
    if (blockText.endsWith("** ")) {
      // Apply red line style (you need to define 'RED_LINE' in your CSS)
      const newContentState = Modifier.applyInlineStyle(
        contentState,
        selectionState.merge({
          anchorOffset: blockText.length - 3,
          focusOffset: blockText.length,
        }),
        'RED_LINE'
      );
      handleEditorStateChange(EditorState.push(editorState, newContentState, 'change-inline-style'));
      blockText = blockText.slice(0, -3); // Remove '** ' from text
    }

    // Handle Underline text formatting
    if (blockText.endsWith("*** ")) {
      handleEditorStateChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
      blockText = blockText.slice(0, -4); // Remove '*** ' from text
    }

    // Handle Highlighted code block formatting
    if (blockText.endsWith("````` ")) {
      handleEditorStateChange(RichUtils.toggleBlockType(editorState, 'code-block'));
      blockText = blockText.slice(0, -6); // Remove '````` ' from text
    }

    return 'not-handled';
  };

  return (
    <div className="editor-container">
      <Editor
        editorState={editorState}
        onChange={handleEditorStateChange}
        handleKeyCommand={handleKeyCommand}
        customStyleMap={{
          RED_LINE: {
            borderLeft: '3px solid red',
            paddingLeft: '10px',
          },
          UNDERLINE: {
            textDecoration: 'underline',
          },
        }}
      />
    </div>
  );
};

export default DraftEditor;
