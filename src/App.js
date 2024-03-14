import React from 'react';
import Title from './Title';
import Button from './Button';
import DraftEditor from './Editor';

function App() {
  const handleSave = () => {
    // Custom save logic can be added here
    alert('Content saved to localStorage!');
  };

  return (
    <div className="App">
      <Title text="Draft.js Editor" />
      <Button onClick={handleSave} label="Save" />
      <DraftEditor />
    </div>
  );
}

export default App;
