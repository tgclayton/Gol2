import { canvasDraw, gridDraw, clearCanvas } from '../functions/canvas.js'
import {useState} from 'react'

export default function TestControls(props) {
  const [showGrid, setShowGrid] = useState(false)

  function checkProps(){
    console.log("props:", props)
  }

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
    <div id="test-controls" className="column control-panel">
      <input id='canvasSize-change' type='number' defaultValue = {props.canvasSize} ></input>
      <button onClick={() => props.changeCanvasSize()} >Change canvas size</button>
      <br></br>
      <button onClick={() => checkProps()} >Check props</button>
      <br></br>
      <button onClick={() => props.checkState()}>Check State</button>
      <br></br>
      <button onClick={() => console.log(props.liveCells)}>Check LiveCells</button>
      <br></br>
      <button onClick = {() => toggleGrid()}>Toggle Grid</button>
    </div>
  )
}