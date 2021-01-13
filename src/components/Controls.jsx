export default function Controls (props){
  return (
    <div id = 'main-control-panel' className = 'control-panel'>
      <button onClick={() => props.makeRandomStart()} >Random Start</button>
      <button onClick={() => props.clearGame()} >Clear Game</button>
      <br/><br/>
      <input id='size-change' type='number' defaultValue = {props.fieldSize} max = {150}></input>
      <br></br>
      <button onClick={() => props.changeSize(Number(document.getElementById('size-change').value))} >Change Field Size</button>
      <br/>
    </div>
  )
}