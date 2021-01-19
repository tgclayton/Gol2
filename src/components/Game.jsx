import React, { useEffect, useState } from 'react'
import '../styles/game.css'

export default function Game(props) {
  // useEffect(()=>console.log('Game rerendered'))

  function getCursorPosition(event, canvas) {
    const rect = canvas.getBoundingClientRect()
    const relTileSize = rect.height / props.boardSize
    // console.log(relTileSize)
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    // console.log(`x:${x} y:${y}`)
    return { x: Math.floor(x / relTileSize), y: Math.floor(y / relTileSize) }
}

  function handleCanvasClick (e) {
    const canvas = document.getElementById('game-canvas')
    const crds = getCursorPosition(e, canvas)
    // console.log(crds)
    props.toggleTile(crds)
  }

  return (
    <div id="canvas-container">
      <canvas id="game-canvas" className = "canvas" height = {props.canvasSize} width = {props.canvasSize} onClick = {(e) => handleCanvasClick(e)}></canvas>
      <canvas id = "grid-canvas" className = "canvas"height = {props.canvasSize} width = {props.canvasSize}></canvas>
    </div>
  )
}