import React, { useEffect, useState } from 'react'
import '../styles/game.css'

export default function Game(props) {
  // const [colWidth, setColWidth] = useState(null)
  // useEffect(() => {
  //   setColWidth(document.getElementById('canvas-container').getBoundingClientRect().width * .98)
  // }, [])
  // console.log(colWidth)
  // height={colWidth} width={colWidth}
  return (
    <div id="canvas-container">
      <canvas id="game-canvas"  height = {props.canvasSize} width = {props.canvasSize}></canvas>
    </div>
  )
}