import React, {useState} from 'react';
import './App.css';
import {readFile} from './helperFunctions/readFile'



function App() {
  const [file, setFile] = useState()


  return (
    <div className="App">
      <h2>Package Analyser</h2>
      <input type="file" onChange={(event) => setFile(event.target.files[0])}></input>
      <button onClick={() => readFile(file)}>Read file</button>
    </div>
  );
}

export default App;
