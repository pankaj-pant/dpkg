import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';



function App() {
  const [file, setFile] = useState()
  const loadFile = () => {

  }
  return (
    <div className="App">
      <h2>Package Analyser</h2>
      <input type="file" onChange={(event) => setFile(event.target.files[0])}></input>
     
    </div>
  );
}

export default App;
