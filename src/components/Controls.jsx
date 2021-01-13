import { useState } from 'react'
import { gridDraw, clearCanvas } from '../functions/canvas.js'

export default function Controls(props) {
  const [showGrid, setShowGrid] = useState(false)

  function toggleGrid() {
    if (showGrid) {
      clearCanvas('grid-canvas')
      setShowGrid(false)
    } else {
      clearCanvas('grid-canvas')
      // console.log(props.fieldSize)
      gridDraw(props.tileSize, props.fieldSize)
      setShowGrid(true)
    }
  }

  function changeFieldSize(val) {
    clearCanvas('grid-canvas')
    if (showGrid) {
      gridDraw(val / 500, val)
    }
    props.changeSize(val)
  }

  return (
    <div id='main-control-panel' className='control-panel'>
      <button onClick={() => props.makeRandomStart()} >Random Start</button>
      <button onClick={() => props.clearGame()} >Clear Game</button>
      <br /><br />
      <input id='size-change' type='number' defaultValue={props.fieldSize} max={150}></input>
      <br></br>
      <button onClick={() => changeFieldSize(Number(document.getElementById('size-change').value))} >Change Board Height/Width</button>
      <br /><br />
      <button onClick={() => toggleGrid()}>Toggle Grid</button>
    </div>
  )
}