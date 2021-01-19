import { useEffect } from "react"
import '../styles/info.css'

export default function Info (props) {
const wrap = props.wrap? "On": "Off"
useEffect(()=> { //needs fix so works when info screen not visible
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
    <div id = "info-panel" className = "control-panel">
      <p >Live Cells: <span id ='livecell-info'>{props.liveCells.size}</span></p>
      <p >Generation: <span id ='gen-info'>{props.gen}</span></p>
      <p>Field Size: {props.size} x {props.size}</p>
      <p>Edge Wrapping: <span id = 'wrap-indicator'>{wrap}</span> </p>
    </div>
  )
}