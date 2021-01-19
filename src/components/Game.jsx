import React, { useEffect, useState } from 'react'
import { canvasDraw, } from '../functions/canvas.js'
import '../styles/game.css'

export default function Game(props) {
  let currentCell = { x: null, y: null }
  let mouseDown = false
  let workLiveCells = props.liveCells || new Set([])
  // let running = props.running ? true : false
  let shiftDown = false

  useEffect(() => {
    window.addEventListener('keydown', (e) => handleKeyDown(e))
    window.addEventListener('keyup', (e) => handleKeyUp(e))
    return () => {
      window.removeEventListener('keydown', (e) => handleKeyDown(e))
      window.removeEventListener('keyup', (e) => handleKeyUp(e))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  function handleKeyDown(e) {
    if (e.key === 'Shift' && shiftDown === false) {
      shiftDown = true
      // console.log(shiftDown)
    }
  }

  function handleKeyUp(e) {
    if (e.key === 'Shift') {
      shiftDown = false
      // console.log(shiftDown)
    }
  }


  function getCursorPosition(e, canvas) {
    const rect = canvas.getBoundingClientRect()
    const relTileHeight = rect.height / props.boardSize
    const relTileWidth = rect.width / props.boardSize
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const finX = x > 0 ? x : 0
    const finY = y > 0 ? y : 0
    return { x: Math.floor(finX / relTileWidth), y: Math.floor(finY / relTileHeight) }
  }

  function handleCanvasEvent(e, current) {
    // console.log(e)
    // e.stopPropagation()
    // e.preventDefault()
    // console.log(shiftDown)
    if (shiftDown) {

    } else {
      if (mouseDown && props.running === null) {
        const canvas = document.getElementById('game-canvas')
        const crds = getCursorPosition(e, canvas)
        const cellIdx = props.crdsToIdx(crds, props.boardSize)
        if (crds.x !== current.x || crds.y !== current.y) {
          if (e.buttons === 1) {
            currentCell = crds
            workLiveCells.add(cellIdx)
          } else {
            currentCell = crds
            workLiveCells.delete(cellIdx)
          }
        }
        props.drawCells(workLiveCells)
      }
    }
  }

  //  onKeyDown={(e) => handleKeyDown(e)} onKeyUp={(e) => handleKeyUp(e)}

  return (
    <div id="canvas-container">
      <canvas id="game-canvas" className="canvas" height={props.canvasSize} width={props.canvasSize}
        onContextMenu={(e) => {
          e.stopPropagation()
          e.preventDefault()
        }}
        onMouseDown={(e) => {
          mouseDown = true
          handleCanvasEvent(e, currentCell)
        }}

        onMouseUp={(e) => {
          if (props.running === null) {
            mouseDown = false
            currentCell = { x: null, y: null }
            props.setLiveCells(workLiveCells)
          }
        }}

        onMouseLeave={() => {
          currentCell = { x: null, y: null }
        }}

        onMouseMove={(e) => handleCanvasEvent(e, currentCell)}
      ></canvas>
      <canvas id="grid-canvas" className="canvas" height={props.canvasSize} width={props.canvasSize}></canvas>
    </div>
  )
}
//