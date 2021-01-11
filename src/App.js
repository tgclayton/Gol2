import './App.css';
import Game from './components/Game'
import TestControls from './components/TestControls'
import Controls from './components/Controls'
import Instructions from './components/Instructions'

import React, { useState, useEffect } from "react"
// import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom'
import { createField, newMakeRandomMap } from './functions/game.js'
import { canvasDraw } from './functions/canvas.js'
import { } from './functions/app.js'

function App() {
  const [canvasSize, setCanvasSize] = useState(500)
  const [fieldSize, setFieldSize] = useState(100)
  const [tileSize, setTileSize] = useState(5)
  const [field, setField] = useState(createField(fieldSize, tileSize))
  const [liveCells, setLiveCells] = useState([])
  const [leftPanelDisplay, setleftPanelDisplay] = useState(<Instructions />)
  const [propTrigger, setPropTrigger] = useState(true)

  useEffect(() => {
    setPropTrigger(!propTrigger)
  },[fieldSize])

  function changeSize(size) {
    // setleftPanelDisplay(<Instructions/>)
    const tileSize = canvasSize / size
    setLiveCells([])
    setField(createField(size, tileSize))
    setFieldSize(size)
    setTileSize(tileSize)
    // setleftPanelDisplay(<Instructions />)
    // setTimeout(() => {
    //   setleftPanelDisplay(testControls)
    // }, 50)
  }

  function canvasTest() {
    const randMap = newMakeRandomMap(fieldSize)
    setLiveCells({ ...randMap })
    canvasDraw(field, randMap, tileSize)
  }

  function changeCanvasSize() {
    setTimeout(null, 50)
    const size = Number(document.getElementById('canvasSize-change').value)
    setCanvasSize(size)
  }

  function checkState() {
    console.log("fieldSize:", fieldSize)
    console.log("tileSize:", tileSize)
    console.log("canvasSize:", canvasSize)
    console.log("propTrigger:", propTrigger)
  }

  function checkComponent() {
    console.log(testControls.props)
  }

  const testControls =
    <TestControls
      canvasTest = {canvasTest}
      fieldSize = {fieldSize}
      changeSize = {changeSize}
      changeCanvasSize = {changeCanvasSize}
      size = {fieldSize}
      canvasSize = {canvasSize}
      propTrigger = {propTrigger}
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
          <div id="left-panel-nav">
            {testControls}
            {/* <button onClick={() => setleftPanelDisplay(testControls)}>Test Controls</button>
            <button onClick={() => setleftPanelDisplay(controls)}>Controls</button>
            <button onClick={() => setleftPanelDisplay(<Instructions />)}>Instructions</button> */}
          </div>
          {leftPanelDisplay}
          <button  onClick = {() => checkState()}>Check State</button>
          <button  onClick = {() => checkComponent()}>Check Component</button>
        </div>

        <div id='center-column' className="column">
          <Game canvasSize={canvasSize} />
        </div>

        <div id='right-column' className="column">

        </div>

      </div>
    </div>
  );
}

export default App;
