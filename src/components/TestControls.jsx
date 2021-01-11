export default function TestControls(props) {
  function checkProps(){
    console.log("props:", props)
  }

  return (
    <div id="test-controls" className="column">
      <button onClick={() => props.canvasTest()}>Canvas Test</button>
      <br></br>
      <input id='size-change' type='number' defaultValue = {props.size} ></input>
      <button onClick={() => props.changeSize(Number(document.getElementById('size-change').value))} >Change field size</button>
      <br></br>
      <input id='canvasSize-change' type='number' defaultValue = {props.canvasSize} ></input>
      <button onClick={() => props.changeCanvasSize()} >Change canvas size</button>
      <br></br>
      <button onClick={() => checkProps()} >Check props</button>
      <br></br>
    </div>
  )
}