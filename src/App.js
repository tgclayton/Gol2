import './App.css';
import Game from './components/Game'
import TestControls from './components/TestControls'
import Controls from './components/Controls'
import Instructions from './components/Instructions'

import React, { useState, useEffect } from "react"
// import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom'
import { createField, newMakeRandomMap } from './functions/game.js'
import { canvasDraw } from './functions/canvas.js'
import {} from './functions/app.js'

function App() {
  const [canvasSize, setCanvasSize] = useState(500)
  const [size, setSize] = useState(100)
  const [tileSize, setTileSize] = useState(5)
  const [field, setField] = useState(createField(size, tileSize))
  const [liveCells, setLiveCells] = useState([])
  const [leftPanelDisplay, setleftPanelDisplay] = useState(<TestControls/>)

  useEffect(() => {
    canvasDraw(field, liveCells, tileSize)
  })

  function changeSize() {
    const size = document.getElementById('size-change').value
    const tileSize = canvasSize / size
    setLiveCells([])
    setField(createField(size, tileSize))
    setSize(size)
    setTileSize(tileSize)
  }

  function canvasTest() {
    const randMap = newMakeRandomMap(size)
    setLiveCells(randMap)
    canvasDraw(field, liveCells, tileSize)
  }

  function changeCanvasSize () {
    const size = document.getElementById('canvasSize-change').value
    setCanvasSize(size)
  }

  const testControls = 
  <TestControls
    canvasTest={canvasTest}
    changeSize={changeSize}
    changeCanvasSize={changeCanvasSize}
    size = {size}
    canvasSize = {canvasSize}
  />

  const controls = 
  <Controls />

  return (
    <div className="App">
      <header className="App-header">
        <h2>Game of Life</h2>
      </header>
      <div className="app-body">
        <div id='left-column' className="column">
          <div id = "left-panel-nav">
            <button onClick={() => setleftPanelDisplay(testControls)}>Test Controls</button>
            <button onClick={() => setleftPanelDisplay(controls)}>Controls</button>
            <button onClick={() => setleftPanelDisplay(<Instructions/>)}>Instructions</button>
          </div>
          {leftPanelDisplay}
        </div>

        <div id='center-column' className="column">
          <Game canvasSize = {canvasSize}/>
        </div>

        <div id='right-column' className="column">

        </div>

      </div>
    </div>
  );
}

export default App;
