import React, { useEffect, useState } from 'react'
import '../styles/game.css'

export default function Game(props) {
  // useEffect(()=>console.log('Game rerendered'))
  function relMouseCoords (event, canvas) {
    let totalOffsetX = 0
    let totalOffsetY = 0
    let canvasX = 0
    let canvasY = 0
  
    do {
      totalOffsetX += canvas.offsetLeft - canvas.scrollLeft
      totalOffsetY += canvas.offsetTop - canvas.scrollTop
    }
    while (canvas === canvas.offsetParent)
  
    canvasX = event.pageX - totalOffsetX
    canvasY = event.pageY - totalOffsetY
  
    return { x: Math.floor(canvasX / 10), y: Math.floor(canvasY / 10) }
  }

  function handleCanvasClick (e) {
    const canvas = document.getElementById('game-canvas')
    const crds = relMouseCoords(e, canvas)
    console.log(crds)
  }

  return (
    <div id="canvas-container">
      <canvas id="game-canvas" className = "canvas" height = {props.canvasSize} width = {props.canvasSize} onClick = {(e) => handleCanvasClick(e)}></canvas>
      <canvas id = "grid-canvas" className = "canvas"height = {props.canvasSize} width = {props.canvasSize}></canvas>
    </div>
  )
}