export default function TestControls(props) {
  return (
    <div id="test-controls" className="column">
      <button onClick={() => props.canvasTest()}>Canvas Test</button>
      <br></br>
      <input id='size-change' type='number' onSubmit ></input>
      <button onClick={() => props.changeSize()} >Change field size</button>
      <br></br>
      {/* <button onClick = {() => setShowTestControls(false)}>Hide Panel</button> */}
    </div>
  )
}