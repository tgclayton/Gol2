import { useEffect, useState } from 'react'
import { gridDraw, clearCanvas } from '../functions/canvas.js'

export default function Controls(props) {
  const [showGrid, setShowGrid] = useState(true)
  useEffect(()=> {
    gridDraw(props.tileSize, props.fieldSize)
  },[])

  useEffect(() => {
    const buttons = Array.from(document.getElementsByClassName('speed-button'))
    buttons.forEach(element => element.classList.remove('active-speed'))
    document.getElementById(`speed-button-${props.speed}`).classList.add('active-speed')
  }, [props.speed])

  function toggleGrid() {
    if (showGrid) {
      clearCanvas('grid-canvas')
      setShowGrid(false)
    } else {
      clearCanvas('grid-canvas')
      // console.log(props.fieldSize)
      gridDraw(props.tileSize, props.fieldSize)
      setShowGrid(true)
    }
  }

  function changeFieldSize(val) {
    clearCanvas('grid-canvas')
    if (showGrid) {
      gridDraw(val / 500, val)
    }
    props.changeSize(val)
  }

  return (
    <>
      <div id='main-control-panel' className='control-panel'>
        <button onClick={() => props.makeRandomStart()} >Random Start</button>
        <button onClick={() => props.clearGame()} >Clear Game</button>
        <br /><br />
        <input id='size-change' type='number' defaultValue={props.fieldSize} max={150}></input>
        <br></br>
        <button onClick={() => changeFieldSize(Number(document.getElementById('size-change').value))} >Change Board Height/Width</button>
        <br /><br />
        <button onClick={() => toggleGrid()}>Toggle Grid</button>
        <button onClick={() => props.wrap.toggleWrap(!props.wrap.wrap)}>Toggle Edge Wrapping</button>
      </div>
      <div id='speed-control' className='control-panel flex-row'>
        <p>Slower</p>
        <div className='speed-button' id ={`speed-button-1`} onClick = {() => props.changeSpeed(1)}>1</div>
        <div className='speed-button' id ={`speed-button-2`} onClick = {() => props.changeSpeed(2)}>2</div>
        <div className='speed-button' id ={`speed-button-3`} onClick = {() => props.changeSpeed(3)}>3</div>
        <div className='speed-button' id ={`speed-button-4`} onClick = {() => props.changeSpeed(4)}>4</div>
        <div className='speed-button' id ={`speed-button-5`} onClick = {() => props.changeSpeed(5)}>5</div>
        <p>Faster</p>
      </div>
    </>
  )
}