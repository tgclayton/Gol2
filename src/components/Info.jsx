import { useEffect } from "react"
import '../styles/info.css'

export default function Info (props) {
const wrap = props.wrap? "On": "Off"
useEffect(()=> {
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
      <p >Live Cells: <sp id ='livecell-info'>{props.liveCells}</sp></p>
      <p >Generation: <sp id ='gen-info'>{props.gen}</sp></p>
      <p>Field Size: {props.size} x {props.size}</p>
      <p>Edge Wrapping: <sp id = 'wrap-indicator'>{wrap}</sp> </p>
    </div>
  )
}