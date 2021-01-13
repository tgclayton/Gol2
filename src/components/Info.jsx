export default function Info (props) {
const wrap = props.wrap? "On": "Off"

  return (
    <div id = "info-panel" className = "control-panel">
      <p>Live Cells: {props.liveCells}</p>
      <p>Generation: {props.gen}</p>
      <p>Field Size: {props.size} x {props.size}</p>
      <p>Edge Wrapping: {wrap} </p>
    </div>
  )
}