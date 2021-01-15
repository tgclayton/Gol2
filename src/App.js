import './App.css';
import Game from './components/Game'
import TestControls from './components/TestControls'
import Controls from './components/Controls'
import Instructions from './components/Instructions'
import Info from './components/Info'

import React, { useState, useEffect } from "react"
import { Route, BrowserRouter as Router, Switch, Link, Redirect } from 'react-router-dom'
import { createField, newMakeRandomMap, makeNextGen } from './functions/game.js'
import { canvasDraw, } from './functions/canvas.js'
import { } from './functions/app.js'

let game = null //holds the interval when game is running
let workLiveCells = new Set([])
let workGen = 0
let wasRunning = false

function App() {
  const [canvasSize, setCanvasSize] = useState(500) //Height/width of the game canvas
  const [boardSize, setboardSize] = useState(30) //Height/width in cells of the game board
  const [tileSize, setTileSize] = useState(500 / 30)
  const [wrap, setWrap] = useState(true) //whether or not edge wrapping is on or not
  const [field, setField] = useState(createField(boardSize, tileSize, wrap)) //object containing data on cell coordinates and neighbours
  const [liveCells, setLiveCells] = useState(new Set([])) // array of index numbers of live cells
  const [leftPanelDisplay, setleftPanelDisplay] = useState('controls')
  const [rightPanelDisplay, setRightPanelDisplay] = useState('info')
  const [generation, setGeneration] = useState(0) //current generation displayed
  const [speed, setActiveSpeed] = useState(300) //speed at which new generations are created when game is running

  
  //Controls highlighting of selected nav button
  useEffect(() => {
    // console.log(`left: ${leftPanelDisplay} right: ${rightPanelDisplay}`)
    let buttons = Array.from(document.getElementsByClassName('nav-button'))
    buttons.forEach(element => element.classList.remove('selected-nav'))
    document.getElementById(`nav-button-${leftPanelDisplay}`).classList.add('selected-nav')
    document.getElementById(`nav-button-${rightPanelDisplay}`).classList.add('selected-nav')
  }, [leftPanelDisplay, rightPanelDisplay])

  useEffect(() => {
    if(wasRunning){
      wasRunning = false
      runGame()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[speed])

  useEffect(()=> {
    window.addEventListener('keyup', e => handleKey(e))
  },[])

 function handleKey (e) {
    // const focus = (document.activeElement === document.getElementById('set-gen'))
    // if () {dddd
      // console.log(e)
      e.Handled = true;
      e.preventDefault()
      switch (e.key) {
        case ' ':
            game
            ? pauseGame()
            : runGame(true, liveCells)
          break
        case 'ArrowLeft':
        case 'a':
          // this.showPrevGen()
          break
        case 'ArrowRight':
        case 'd':
          runGame(true)
          break
        case 'ArrowDown':
        case 's':
          clearGame()
          break
        case 'ArrowUp':
        case 'w':
          e.preventDefault()
          makeRandomStart()
          break
        case '1':
          changeSpeed(600)
          break
        case '2':
          changeSpeed(300)
          break
        case '3':
          changeSpeed(120)
          break
        case '4':
          changeSpeed(30)
          break
        case '5':
          changeSpeed(1)
          break
        case 'e':
          console.log('e pressed')
          toggleWrap()
        default: console.log(e)
      }
    // }
  }

  function changeSize(size) {
    const tileSize = canvasSize / size
    setField(createField(size, tileSize))
    setboardSize(size)
    setTileSize(tileSize)
    clearGame()
  }

  function clearGame() {
    console.log('cleared')
    workLiveCells = []
    pauseGame()
    setLiveCells(new Set([]))
    setGeneration(0)
    workGen = 0
    canvasDraw(field, [], tileSize)
    document.getElementById('gen-info').innerHTML = workGen
  }

  function makeRandomStart() {
    const wasRunning = game ? true : false
    // console.log(wasRunning)
    pauseGame()
    clearGame()
    setTimeout(() => {
      const randMap = newMakeRandomMap(boardSize)
      canvasDraw(field, randMap, tileSize)
      if (wasRunning) {
        console.log('got here')
        runGame(false, randMap)
      } else {
        setLiveCells(randMap)
      }
    }, 50);
  }

  function changeCanvasSize() {
    const size = Number(document.getElementById('canvasSize-change').value)
    setCanvasSize(size)
    canvasDraw(field, liveCells, tileSize)
  }

  function changeSpeed(speed) {
    wasRunning = game ? true : false
    pauseGame()
    setActiveSpeed(speed)
  }

  function pauseGame() {
    if (game) {
      clearInterval(game)
      game = null
      console.log('game', game)
      setLiveCells(workLiveCells)
      setGeneration(workGen)
    }
  }

  function checkState() {
    console.log("boardSize:", boardSize)
    console.log("tileSize:", tileSize)
    console.log("canvasSize:", canvasSize)
  }

  function toggleWrap() {
    const newWrap = !wrap
    setWrap(newWrap)
    // setField(createField(boardSize, tileSize, newWrap))
  }

  function nextGen() { //generates next generation when game is not freely running
    // console.log('nextGen occurred')
    // console.log('livecells', liveCells)
    const nextGen = makeNextGen(liveCells, boardSize, field, wrap)
    setLiveCells(nextGen)
    const newGen = generation + 1
    setGeneration(newGen)
    console.log('nextgen:', nextGen)
    canvasDraw(field, liveCells, tileSize)
  }

  function runningNextGen() { //generates next generation while game is running freely
    const nextGen = makeNextGen(workLiveCells, boardSize, field, wrap)
    workLiveCells = nextGen
    workGen++
    document.getElementById('gen-info').innerHTML = workGen
    document.getElementById('livecell-info').innerHTML = workLiveCells.size
    canvasDraw(field, nextGen, tileSize)
  }

  function runGame(singleGen, workCells) {
    // console.log('game:', game)
    if (!game) {
      if (singleGen) {
        nextGen()
      } else {
        workLiveCells = workCells ? workCells : new Set([...liveCells])
        workGen = generation
        game = setInterval(() => runningNextGen(), speed)
      }
    }
  }

  return (
    <Router>
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
                  boardSize={boardSize}
                  changeCanvasSize={changeCanvasSize}
                  size={boardSize}
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
                  boardSize={boardSize}
                  wrap={{ wrap, toggleWrap }}
                  speed={speed}
                  changeSpeed={changeSpeed}
                  runGame={runGame}
                  pauseGame={pauseGame}
                />
              </Route>
            </Switch>
          </div>

          <div id='center-column' className="column">
            <Game canvasSize={canvasSize} liveCells={liveCells} size={boardSize} />
          </div>

          <div id='right-column' className="column">
            <div id="right-panel-nav" className="panel-nav">
              <Link to={`/${leftPanelDisplay}/saves`} replace id='nav-button-saves' className='nav-button' onClick={() => setRightPanelDisplay('saves')}>Saves</Link>
              <Link to={`/${leftPanelDisplay}/info`} replace id='nav-button-info' className='nav-button' onClick={() => setRightPanelDisplay('info')}>Info</Link>
            </div>
            {/* <Stats/> */}
            <Switch>
              <Route path={`/${leftPanelDisplay}/saves`}>
              </Route>
              <Route path={`/${leftPanelDisplay}/info`}>
                <Info
                  liveCells={liveCells.size}
                  size={boardSize}
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
