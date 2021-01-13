// import React, { useEffect, useState } from 'react'
import '../styles/game.css'

export default function Game(props) {
  return (
    <div id="canvas-container">
      <canvas id="game-canvas" className = "canvas" height = {props.canvasSize} width = {props.canvasSize}></canvas>
      <canvas id = "grid-canvas" className = "canvas"height = {props.canvasSize} width = {props.canvasSize}></canvas>
    </div>
  )
}