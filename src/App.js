import './App.css';
import Game from './components/Game'
import TestControls from './components/TestControls'
import Controls from './components/Controls'
import Instructions from './components/Instructions'
import Info from './components/Info'

import React, { useState, useEffect } from "react"
import { Route, BrowserRouter as Router, Switch, Link, Redirect } from 'react-router-dom'
import { createField, newMakeRandomMap } from './functions/game.js'
import { canvasDraw,} from './functions/canvas.js'
import { } from './functions/app.js'

function App() {
  const [canvasSize, setCanvasSize] = useState(500) //Height/width of the game canvas
  const [fieldSize, setFieldSize] = useState(20) //Height/width in cells of the game board
  const [tileSize, setTileSize] = useState(25) 
  const [wrap, setWrap] = useState(true) //whether or not edge wrapping is on or not
  const [field, setField] = useState(createField(fieldSize, tileSize, wrap)) //object containing data on cell coordinates and neighbours
  const [liveCells, setLiveCells] = useState([]) // array of index numbers of live cells
  const [leftPanelDisplay, setleftPanelDisplay] = useState('controls')
  const [rightPanelDisplay, setRightPanelDisplay] = useState('info')
  const [generation, setGeneration] = useState(0) //current generation displayed
  const [speed, setActiveSpeed] = useState(4)
 

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

  function changeSpeed(speed) {
    setActiveSpeed(speed)
  }

  function checkState() {
    console.log("fieldSize:", fieldSize)
    console.log("tileSize:", tileSize)
    console.log("canvasSize:", canvasSize)
  }

  function toggleWrap () {
    const newWrap = !wrap
    setWrap(newWrap)
    setField(createField(fieldSize, tileSize, newWrap))
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
                  wrap={{wrap, toggleWrap}}
                  speed={speed}
                  changeSpeed={changeSpeed}
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
              <Link to={`/${leftPanelDisplay}/info`} replace id='nav-button-info' className='nav-button' onClick={() => setRightPanelDisplay('info')}>Info</Link>
            </div>
            {/* <Stats/> */}
            <Switch>
              <Route  path={`/${leftPanelDisplay}/saves`}>
              </Route>
              <Route path={`/${leftPanelDisplay}/info`}>
                <Info
                  liveCells={liveCells.length}
                  size={fieldSize}
                  gen={generation}
                  wrap={wrap}
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
