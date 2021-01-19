// import { canvasDraw, gridDraw, clearCanvas } from '../functions/canvas.js'


export default function TestControls(props) {

  function checkProps(){
    console.log("props:", props)
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

    </div>
  )
}