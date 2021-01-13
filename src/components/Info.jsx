import { useEffect } from "react"
import '../styles/info.css'

export default function Info (props) {
const wrap = props.wrap? "On": "Off"
useEffect(()=> {
  const span = document.getElementById('wrap-indicator')
  span.className = ''
  if (props.wrap) {
    span.classList.add('indicator-on')
  } else {
    span.classList.add('indicator-off')
  }
}, [props.wrap])

  return (
    <div id = "info-panel" className = "control-panel">
      <p>Live Cells: {props.liveCells}</p>
      <p>Generation: {props.gen}</p>
      <p>Field Size: {props.size} x {props.size}</p>
      <p>Edge Wrapping: <sp id = 'wrap-indicator'>{wrap}</sp> </p>
    </div>
  )
}