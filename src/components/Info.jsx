import { useEffect } from "react"
import '../styles/info.css'

export default function Info(props) {
  const speedDisp = props.speed===600
  ? 1: props.speed===300
  ? 2: props.speed===120
  ? 3: props.speed===30
  ? 4: 5
  const wrap = props.wrap ? "On" : "Off"
  useEffect(() => { //needs fix so works when info screen not visible
    const span = document.getElementById('wrap-indicator')
    const canvas = document.getElementById('canvas-container')
    canvas.className = ''
    span.className = ''
    if (props.wrap) {
      span.classList.add('indicator-on')
    } else {
      canvas.classList.add('no-wrap-canvas')
      span.classList.add('indicator-off')
    }
  }, [props.wrap])

  return (
    <>
      <div id="info-panel" className="control-panel">
        <p >Live Cells: <span id='livecell-info'>{props.liveCells.size}</span></p>
        <p >Generation: <span id='gen-info'>{props.gen}</span></p>
        <p>Field Size: {props.size} x {props.size}</p>
        <p>Edge Wrapping: <span id='wrap-indicator'>{wrap}</span> </p>
        <p>Speed: <span id='speed-indicator'>{speedDisp}</span></p>
      </div>
      <div className='control-panel instructions' id = "key-control-instructions" style={{marginTop: '1em'}}>
        <h5>Keyboard Controls</h5>
        <p><span>W/Up Arrow:</span> Create a new random game</p>
        <p><span>S/Down Arrow:</span> Clear the game board</p>
        <p><span>D/Left Arrow:</span> Advance the game a single generation</p>
        <p><span>Space:</span> Starts or pauses the game running</p>
        <p><span>Numbers 1-5:</span> Set game speed</p>
        <p><span>E:</span> Toggle edge wrapping</p>
      </div>
    </>
  )
}