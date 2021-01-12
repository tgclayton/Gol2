export default function Controls (props){
  return (
    <div id = 'main-control-panel' className = 'control-panel'>
      <button onClick={() => props.makeRandomStart()} >Random Start</button>
      <button onClick={() => props.clearGame()} >Clear Game</button>
    </div>
  )
}