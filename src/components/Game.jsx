import React, { useEffect, useState } from 'react'
import { canvasDraw, } from '../functions/canvas.js'
import '../styles/game.css'

export default function Game(props) {
  // const [canvas, setCanvas] = useState(document.getElementById('game-canvas'))
  let currentCell = { x: null, y: null }
  let mouseDown = false
  let workLiveCells = props.liveCells || new Set([])

  // useEffect(()=> {
  //   setCanvas(document.getElementById('game-canvas'))
  // },[])

  const debounce = (func, wait) => {
    let timeout;
  
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
  
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

    function getCursorPosition(e, canvas) {
      const rect = canvas.getBoundingClientRect()
      const relTileSize = rect.height / props.boardSize
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      return { x: Math.floor(x / relTileSize), y: Math.floor(y / relTileSize) }
    }

    function handleCanvasEvent(e, current) {
      if (mouseDown && !props.running && e.buttons === 1) {
        const canvas = document.getElementById('game-canvas')
        const crds = getCursorPosition(e, canvas)
        const cellIdx = props.crdsToIdx(crds, props.boardSize)
        // console.log('crds:', crds)
        // console.log('current:', current)
        if (crds.x !== current.x || crds.y !== current.y) {
          if (!workLiveCells.has(cellIdx)) {
            currentCell = crds
            workLiveCells.add(cellIdx)
          } else {
            currentCell = crds
            workLiveCells.delete(cellIdx)
          }
        }
        console.log(' ')
        props.drawCells(workLiveCells)
      }
      // console.log(crds)
    }

    return (
      <div id="canvas-container">
        <canvas id="game-canvas" className="canvas" height={props.canvasSize} width={props.canvasSize}
          onMouseDown={(e) => {
            mouseDown = true
            handleCanvasEvent(e, currentCell)
          }}
          onMouseUp={() => {
            mouseDown = false
            currentCell = { x: null, y: null }
            props.setLiveCells(workLiveCells)
          }}
          onMouseLeave={() => {
            // mouseDown = false;
            currentCell = { x: null, y: null }
          }}
          onMouseMove={(e) => handleCanvasEvent(e, currentCell)}
        ></canvas>
        <canvas id="grid-canvas" className="canvas" height={props.canvasSize} width={props.canvasSize}></canvas>
      </div>
    )
  }
//