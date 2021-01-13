import {useState} from 'react'
import { canvasDraw, gridDraw, clearCanvas } from '../functions/canvas.js'

export default function Controls (props){
  const [showGrid, setShowGrid] = useState(false)

  function toggleGrid() {
    if (showGrid){
      clearCanvas('grid-canvas')
      setShowGrid(false)
    } else {
      setShowGrid(true)
      gridDraw(props.tileSize)
    }

  }
  return (
    <div id = 'main-control-panel' className = 'control-panel'>
      <button onClick={() => props.makeRandomStart()} >Random Start</button>
      <button onClick={() => props.clearGame()} >Clear Game</button>
      <br/><br/>
      <input id='size-change' type='number' defaultValue = {props.fieldSize} max = {150}></input>
      <br></br>
      <button onClick={() => props.changeSize(Number(document.getElementById('size-change').value))} >Change Field Size</button>
      <br/>
      <button onClick = {() => toggleGrid()}>Toggle Grid</button>
    </div>
  )
}