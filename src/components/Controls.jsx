import { useEffect, useState } from 'react'
import { gridDraw, clearCanvas } from '../functions/canvas.js'

export default function Controls(props) {
  const [showGrid, setShowGrid] = useState(true)
  
  useEffect(()=> {
    toggleGrid()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.grid])
  
  useEffect(() => {
    if(showGrid){
      clearCanvas('grid-canvas')
      gridDraw(props.tileSize, props.boardSize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.boardSize])

  useEffect(() => {
    const activeSpeed = props.speed === 600 ? 1 : props.speed === 300 ? 2 : props.speed === 120 ? 3 : props.speed === 30 ? 4 : 5
    const buttons = Array.from(document.getElementsByClassName('speed-button'))
    buttons.forEach(element => element.classList.remove('active-speed'))
    document.getElementById(`speed-button-${activeSpeed}`).classList.add('active-speed')
  }, [props.speed])

  function toggleGrid() {
    console.log('toggleGrid fired')
    if (showGrid) {
      clearCanvas('grid-canvas')
      setShowGrid(false)
    } else {
      clearCanvas('grid-canvas')
      gridDraw(props.tileSize, props.boardSize)
      setShowGrid(true)
    }
  }

  function changeboardSize(val) {
    clearCanvas('grid-canvas')
    if (showGrid) {
      gridDraw(val / 500, val)
    }
    props.changeSize(val)
  }

  return (
    <>
      <div id='main-control-panel' className='control-panel'>
      <h5 className={'panel-title'}>Controls</h5>
        <button onClick={() => props.makeRandomStart()} >Random Start</button>
        <button onClick={() => props.clearGame()} >Clear Game</button>
        <br />
        <button onClick={() => props.runGame(true)} >Next Generation</button>
        <button onClick={() => props.runGame()} >Run Game</button>
        <button onClick ={() => props.pauseGame()}>Pause Game</button>
        <br /><br />
        <input className ='editable' id='size-change' type='number' defaultValue={props.boardSize} max={250}></input>
        <br></br>
        <button onClick={() => changeboardSize(Number(document.getElementById('size-change').value))} >Change Board Height/Width</button>
        <br /><br />
        <button onClick={() => toggleGrid()}>Toggle Grid</button>
        <button onClick={() => props.wrap.toggleWrap(!props.wrap.wrap)}>Toggle Edge Wrapping</button>
      </div>
      <div id='speed-control' className = 'control-panel column'>
      <h5 className={'panel-title'}>Speed Control</h5>
        {/* <h5>Speed Control</h5> */}
        <div className='flex-row'>
          <p>Slower</p>
          <div className='speed-button' id={`speed-button-1`} onClick={() => props.changeSpeed(600)}>1</div>
          <div className='speed-button' id={`speed-button-2`} onClick={() => props.changeSpeed(300)}>2</div>
          <div className='speed-button' id={`speed-button-3`} onClick={() => props.changeSpeed(120)}>3</div>
          <div className='speed-button' id={`speed-button-4`} onClick={() => props.changeSpeed(30)}>4</div>
          <div className='speed-button' id={`speed-button-5`} onClick={() => props.changeSpeed(1)}>5</div>
          <p>Faster</p>
        </div>
      </div>
    </>
  )
}