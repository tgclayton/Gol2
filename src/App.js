import './App.css';
import Game from './components/Game'
import React, { useState, useEffect } from "react";
import { createField, newMakeRandomMap } from './functions/game.js'
import { canvasDraw } from './functions/canvas.js'

function App() {
  const [size, setSize] = useState(100)
  const [tileSize, setTileSize] = useState(500 / size)
  const [field, setField] = useState(createField(size, tileSize))
  const [liveCells, setLiveCells] = useState(newMakeRandomMap(size))

  useEffect(() => {
    canvasDraw(field, liveCells, tileSize)
  })

  function changeSize() {
    const size = document.getElementById('size-change').value
    const tileSize = 500 / size
    setLiveCells(newMakeRandomMap(size))
    setField(createField(size, tileSize))
    setSize(size)
    setTileSize(tileSize)
  }

  function canvasTest(callback) {
    const randMap = newMakeRandomMap(size)
    setLiveCells(randMap)
    callback(field, liveCells, tileSize)
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
          {/* <button onClick={() => checkState()}>Check State</button> */}
          <br></br>
          <input id='size-change' type='number' onSubmit ></input>
          <button onClick={() => changeSize()} >Change field size</button>
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
