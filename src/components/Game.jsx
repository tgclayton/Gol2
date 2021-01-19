import React, { useEffect, useState } from 'react'
import { canvasDraw, } from '../functions/canvas.js'
import '../styles/game.css'

export default function Game(props) {
  let currentCell = { x: null, y: null }
  let mouseDown = false
  let workLiveCells = props.liveCells || new Set([])
  // let running = props.running ? true : false
  let shiftDown = false
  let firstCell = null

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

  function getSelectedCells(first, final) {
    let selected = new Set([])
    const minX = Math.min(first.x, final.x)
    const minY = Math.min(first.y, final.y)
    const maxX = Math.max(first.x, final.x)
    const maxY = Math.max(first.y, final.y)
    for (let i = minX; i <= maxX; i++) {
      for (let n = minY; n <= maxY; n++) {
        const crds = {x:i, y:n}
        selected.add(props.crdsToIdx(crds, props.boardSize))
      }
    }
    // console.log(selected)
    return selected
  }

  function handleCanvasEvent(e, current) {
    // console.log(e)
    e.stopPropagation()
    e.preventDefault()
    // console.log(shiftDown)
    const button = e.buttons
    const canvas = document.getElementById('game-canvas')
    const crds = getCursorPosition(e, canvas)
    const cellIdx = props.crdsToIdx(crds, props.boardSize)
    if (mouseDown && props.running === null) { //only proceed if mouse is held down and game is not running
      if (crds.x !== current.x || crds.y !== current.y) { // proceed if its first click or entering a new cell
        currentCell = crds
        if (shiftDown) { //handle shift dragging functions
          if (!firstCell) {
            firstCell = crds
          }
        } else if (button === 1) { //left mouse adds cells
          workLiveCells.add(cellIdx)
        } else { //right mouse removes cells
          workLiveCells.delete(cellIdx)
        }

      }
    }
    props.drawCells(workLiveCells)
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
          if (props.running === null) {
          mouseDown = true
          handleCanvasEvent(e, currentCell)
          }
        }}

        onMouseUp={(e) => {
          if (props.running === null) {
            if (firstCell) {
              const selectedCells = getSelectedCells(firstCell, currentCell) || new Set([])
              firstCell = null
              mouseDown = false
              currentCell = { x: null, y: null }
              if (e.button === 2) {
                console.log('rightmouse')
                selectedCells.forEach(cell => workLiveCells.delete(cell))
              } else {
                console.log('leftmouse')
                selectedCells.forEach(cell => workLiveCells.add(cell))
              }
            } else {
              const setCells = workLiveCells
              workLiveCells = new Set([])
              props.setLiveCells(setCells)
            }
          }
        }}

        onMouseLeave={() => {
          currentCell = { x: null, y: null }
        }}

        onMouseMove={(e) => {
          if (props.running === null) handleCanvasEvent(e, currentCell)
        }}
      ></canvas>
      <canvas id="grid-canvas" className="canvas" height={props.canvasSize} width={props.canvasSize}></canvas>
    </div>
  )
}
//