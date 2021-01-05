import './App.css';
import Game from './components/Game'
import React, { useState, useEffect } from "react";
import { createField, newMakeRandomMap } from './functions/game.js'
import { canvasDraw } from './functions/canvas.js'

function App() {
  const [size, setSize] = useState(100)
  const [tileSize, setTileSize] = useState(3)
  const [field, setField] = useState(createField(size, tileSize))
  const [liveCells, setLiveCells] = useState(newMakeRandomMap(size))

  async function canvasTest(callback) {
    const randMap = await newMakeRandomMap(size)
    const res = await setLiveCells(randMap)
    console.log(res)
    callback(field, liveCells, tileSize)
    //  setTimeout(canvasDraw(field, liveCells, tileSize), 150) 
  }

  function checkState() {
    console.log('size:', size)
    console.log('tileSize:', tileSize)
    console.log('field:', field)
    console.log('liveCells:', liveCells)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Game of Life</h2>
      </header>
      <div className="app-body">
        <div id='left-column' className="column">
          <button onClick={() => canvasTest(canvasDraw)}>Canvas Test</button>
          <button onClick={() => checkState()}>Check State</button>
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
