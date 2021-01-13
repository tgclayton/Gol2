import { useEffect, useState } from 'react'
import { gridDraw, clearCanvas } from '../functions/canvas.js'

export default function Controls(props) {
  const [showGrid, setShowGrid] = useState(true)
  useEffect(() => {
    gridDraw(props.tileSize, props.boardSize)
  }, [])

  useEffect(() => {
    const activeSpeed = props.speed === 600 ? 1 : props.speed === 300 ? 2 : props.speed === 120 ? 3 : props.speed === 30 ? 4 : 5
    const buttons = Array.from(document.getElementsByClassName('speed-button'))
    buttons.forEach(element => element.classList.remove('active-speed'))
    document.getElementById(`speed-button-${activeSpeed}`).classList.add('active-speed')
  }, [props.speed])

  function toggleGrid() {
    if (showGrid) {
      clearCanvas('grid-canvas')
      setShowGrid(false)
    } else {
      clearCanvas('grid-canvas')
      // console.log(props.boardSize)
      gridDraw(props.tileSize, props.boardSize)
      setShowGrid(true)
    }
  }

  function changeboardSize(val) {
    clearCanvas('grid-canvas')
    if (showGrid) {
      gridDraw(val / 500, val)
    }
    props.changeSize(val)
  }

  return (
    <>
      <div id='main-control-panel' className='control-panel'>
        <button onClick={() => props.makeRandomStart()} >Random Start</button>
        <button onClick={() => props.clearGame()} >Clear Game</button>
        <br />
        <button onClick={() => props.nextGen()} >Next Generation</button>
        <br /><br />
        <input id='size-change' type='number' defaultValue={props.boardSize} max={150}></input>
        <br></br>
        <button onClick={() => changeboardSize(Number(document.getElementById('size-change').value))} >Change Board Height/Width</button>
        <br /><br />
        <button onClick={() => toggleGrid()}>Toggle Grid</button>
        <button onClick={() => props.wrap.toggleWrap(!props.wrap.wrap)}>Toggle Edge Wrapping</button>
      </div>
      <div id='speed-control' className = 'control-panel column'>
        <h5>Speed Control</h5>
        <div className='flex-row'>
          <p>Slower</p>
          <div className='speed-button' id={`speed-button-1`} onClick={() => props.changeSpeed(600)}>1</div>
          <div className='speed-button' id={`speed-button-2`} onClick={() => props.changeSpeed(300)}>2</div>
          <div className='speed-button' id={`speed-button-3`} onClick={() => props.changeSpeed(120)}>3</div>
          <div className='speed-button' id={`speed-button-4`} onClick={() => props.changeSpeed(30)}>4</div>
          <div className='speed-button' id={`speed-button-5`} onClick={() => props.changeSpeed(1)}>5</div>
          <p>Faster</p>
        </div>
      </div>
    </>
  )
}