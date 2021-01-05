import './App.css';
import Game from './components/Game'
import React, { useState, useEffect } from "react";

function App() {
const [field, setField] = useState(null)

  return (
    <div className="App">
      <header className="App-header">
        <h2>Game of Life</h2>
      </header>
      <div className="app-body">
        <div id='left-column' className="column">
          <button>Canvas Test</button>       
        </div>

        <div id='center-column' className="column">
          <Game></Game>
        </div>

        <div id='right-column' className="column">

        </div>
      </div>
    </div>
  );
}

export default App;
