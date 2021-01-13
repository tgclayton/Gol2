import './App.css';
import Game from './components/Game'
import TestControls from './components/TestControls'
import Controls from './components/Controls'
import Instructions from './components/Instructions'
import Stats from './components/Stats'

import React, { useState, useEffect } from "react"
import { Route, BrowserRouter as Router, Switch, Link, Redirect } from 'react-router-dom'
import { createField, newMakeRandomMap } from './functions/game.js'
import { canvasDraw, gridDraw } from './functions/canvas.js'
import { } from './functions/app.js'

function App() {
  const [canvasSize, setCanvasSize] = useState(500)
  const [fieldSize, setFieldSize] = useState(100)
  const [tileSize, setTileSize] = useState(5)
  const [field, setField] = useState(createField(fieldSize, tileSize))
  const [liveCells, setLiveCells] = useState([])
  const [leftPanelDisplay, setleftPanelDisplay] = useState('controls')
  const [rightPanelDisplay, setRightPanelDisplay] = useState('stats')
  const [generation, setGeneration] = useState(0)
  // const [showGrid, setShowGrid] = useState(false)


  //Controls highlighting of selected nav button
  useEffect(() => {
    // console.log(`left: ${leftPanelDisplay} right: ${rightPanelDisplay}`)
    let buttons = Array.from(document.getElementsByClassName('nav-button'))
    buttons.forEach(element => element.classList.remove('selected-nav'))
    document.getElementById(`nav-button-${leftPanelDisplay}`).classList.add('selected-nav')
    document.getElementById(`nav-button-${rightPanelDisplay}`).classList.add('selected-nav')
  }, [leftPanelDisplay, rightPanelDisplay])

  useEffect(() => {
    canvasDraw(field, liveCells, tileSize)
  })

  function changeSize(size) {
    const tileSize = canvasSize / size
    setField(createField(size, tileSize))
    setFieldSize(size)
    setTileSize(tileSize)
    clearGame()
  }

  function clearGame() {
    setLiveCells([])
    setGeneration(0)
    canvasDraw(field, [], tileSize)
  }

  function makeRandomStart() {
    const randMap = newMakeRandomMap(fieldSize)
    setLiveCells(randMap)
    canvasDraw(field, randMap, tileSize)
  }

  function changeCanvasSize() {
    const size = Number(document.getElementById('canvasSize-change').value)
    setCanvasSize(size)
    canvasDraw(field, liveCells, tileSize)
  }

  function checkState() {
    console.log("fieldSize:", fieldSize)
    console.log("tileSize:", tileSize)
    console.log("canvasSize:", canvasSize)
  }

  return (
    <Router>
      <Redirect to={`/`}></Redirect>
      <Redirect to={`/${leftPanelDisplay}/${rightPanelDisplay}`}></Redirect>
      <div className="App">
        <header className="App-header">
          <h2>Game of Life</h2>
        </header>
        <div className="app-body">
          <div id='left-column' className="column">
            <div id="left-panel-nav" className="panel-nav">
              <Link to={`/controls/${rightPanelDisplay}`} replace id='nav-button-controls' className='nav-button' onClick={() => setleftPanelDisplay('controls')}>Controls</Link>
              <Link to={`/instructions/${rightPanelDisplay}`} replace id='nav-button-instructions' className='nav-button' onClick={() => setleftPanelDisplay('instructions')}>Instructions</Link>
              <Link to={`/test-controls/${rightPanelDisplay}`} replace id='nav-button-test-controls' className='nav-button' onClick={() => setleftPanelDisplay('test-controls')}>Test Controls</Link>
            </div>
            <Switch>
              <Route path="/instructions">
                <Instructions />
              </Route>
              <Route path="/test-controls">
                <TestControls
                  makeRandomStart={makeRandomStart}
                  fieldSize={fieldSize}
                  changeCanvasSize={changeCanvasSize}
                  size={fieldSize}
                  canvasSize={canvasSize}
                  checkState={checkState}
                  liveCells={liveCells}
                  />
              </Route>
              <Route path="/controls">
                <Controls
                  tileSize={tileSize}
                  makeRandomStart={makeRandomStart}
                  clearGame={clearGame}
                  changeSize={changeSize}
                  fieldSize={fieldSize}
                />
              </Route>
            </Switch>
          </div>

          <div id='center-column' className="column">
            <Game canvasSize={canvasSize} />
          </div>

          <div id='right-column' className="column">
            <div id="right-panel-nav" className="panel-nav">
              <Link to={`/${leftPanelDisplay}/saves`} replace id='nav-button-saves' className='nav-button' onClick={() => setRightPanelDisplay('saves')}>Saves</Link>
              <Link to={`/${leftPanelDisplay}/stats`} replace id='nav-button-stats' className='nav-button' onClick={() => setRightPanelDisplay('stats')}>Stats</Link>
            </div>
            {/* <Stats/> */}
            <Switch>
              <Route  path={`/${leftPanelDisplay}/saves`}>
              </Route>
              <Route path={`/${leftPanelDisplay}/stats`}>
                <Stats
                  liveCells={liveCells.length}
                  size={fieldSize}
                  gen={generation}
                />
              </Route>
            </Switch>
          </div>

        </div>
      </div>
    </Router>
  );
}

export default App;
