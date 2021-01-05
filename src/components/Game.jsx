import React from 'react'
import '../styles/game.css'

export default function Game(props) {
  return (
    <>
      {/* <div id="canvas-dummy"></div> */}
      <div id="canvas-container">
        <canvas id="game-canvas"></canvas>
      </div>
    </>
  )
}