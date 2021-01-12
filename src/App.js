import './App.css';
import Game from './components/Game'
import TestControls from './components/TestControls'
import Controls from './components/Controls'
import Instructions from './components/Instructions'

import React, { useState, useEffect } from "react"
import { Route, BrowserRouter as  Router, Switch, Link, Redirect } from 'react-router-dom'
import { createField, newMakeRandomMap } from './functions/game.js'
import { canvasDraw } from './functions/canvas.js'
import { } from './functions/app.js'

function App() {
  const [canvasSize, setCanvasSize] = useState(500)
  const [fieldSize, setFieldSize] = useState(100)
  const [tileSize, setTileSize] = useState(5)
  const [field, setField] = useState(createField(fieldSize, tileSize))
  const [liveCells, setLiveCells] = useState([])
  const [leftPanelDisplay, setleftPanelDisplay] = useState('instructions')
  const [propTrigger, setPropTrigger] = useState(true)

  useEffect(() => {
    let buttons = Array.from(document.getElementsByClassName('nav-button'))
    buttons.forEach(element => element.classList.remove('selected-nav'))
    document.getElementById(`nav-button-${leftPanelDisplay}`).classList.add('selected-nav')
  }, [leftPanelDisplay])

  function changeSize(size) {
    const tileSize = canvasSize / size
    setLiveCells([])
    setField(createField(size, tileSize))
    setFieldSize(size)
    setTileSize(tileSize)
    canvasDraw(field, [], tileSize)
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

  return (
    <Router>
      <Redirect to ={leftPanelDisplay}></Redirect>
      <div className="App">
        <header className="App-header">
          <h2>Game of Life</h2>
        </header>
        <div className="app-body">
          <div id='left-column' className="column">
            <div id="left-panel-nav">
              <Link to = '/controls' id ='nav-button-controls' className ='nav-button' onClick = {() => setleftPanelDisplay('controls')}>Controls</Link>
              <Link to = '/instructions' id ='nav-button-instructions' className ='nav-button' onClick = {() => setleftPanelDisplay('instructions')}>Instructions</Link>
              <Link to = '/test-controls' id ='nav-button-test-controls' className ='nav-button' onClick = {() => setleftPanelDisplay('test-controls')}>Test Controls</Link>
            </div>
            <Switch>
              <Route path="/instructions">
                <Instructions />
              </Route>
              <Route path="/test-controls">
                <TestControls
                  canvasTest={canvasTest}
                  fieldSize={fieldSize}
                  changeSize={changeSize}
                  changeCanvasSize={changeCanvasSize}
                  size={fieldSize}
                  canvasSize={canvasSize}
                  propTrigger={propTrigger}
                  checkState= {checkState}
                />
              </Route>
              <Route path="/controls">
                <Controls />
              </Route>
            </Switch>
          </div>

          <div id='center-column' className="column">
            <Game canvasSize={canvasSize} />
          </div>

          <div id='right-column' className="column">

          </div>

        </div>
      </div>
    </Router>
  );
}

export default App;
