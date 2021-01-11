import './App.css';
import Game from './components/Game'
import TestControls from './components/TestControls'
import React, { useState, useEffect } from "react"
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom'
import { createField, newMakeRandomMap } from './functions/game.js'
import { canvasDraw } from './functions/canvas.js'
import {} from './functions/app.js'

function App() {
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
    const tileSize = 500 / size
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

  // let leftColumnDisplay = null
  // if (leftPanelDisplay === 'test-controls') {
  //   leftColumnDisplay = <TestControls canvasTest={canvasTest} changeSize={changeSize} size = {size}/>
  // }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Game of Life</h2>
      </header>
      <div className="app-body">
        <div id='left-column' className="column">
          <div id = "left-panel-nav">
            <button onClick={() => setleftPanelDisplay(<TestControls/>)}>Test Controls</button>
            <button onClick={() => setleftPanelDisplay('Controls')}>Controls</button>
            <button onClick={() => setleftPanelDisplay('Instructions')}>instructions</button>
          </div>
          {leftPanelDisplay}
          {/* <div id="test-controls" className="column">
            <button onClick={() => canvasTest(canvasDraw)}>Canvas Test</button>
            <br></br>
            <input id='size-change' type='number' onSubmit ></input>
            <button onClick={() => changeSize()} >Change field size</button>
            <br></br>
          </div> */}
        </div>

        <div id='center-column' className="column">
          <Game />
        </div>

        <div id='right-column' className="column">

        </div>

      </div>
    </div>
  );
}

export default App;
