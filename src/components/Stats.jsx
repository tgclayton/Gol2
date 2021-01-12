export default function Stats (props) {
  return (
    <div id = "stats-panel" className = "control-panel">
      <p>Live Cells: {props.liveCells}</p>
      {/* <p>Generation{props.gen}</p> */}
      <p>Field Size: {props.size} x {props.size}</p>
    </div>
  )
}