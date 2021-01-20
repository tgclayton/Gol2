export default function Instructions(props) {
  return (
    <>
      <div className='control-panel instructions'>
      <h5>Rules</h5>
      </div>
      <br></br>
      <div className='control-panel instructions'>
      <h5>Keyboard Controls</h5>
      <p><span>W/Up Arrow:</span> Create a new random game</p>
      <p><span>S/Down Arrow:</span> Clear the game board</p>
      <p><span>D/Left Arrow:</span> Advance the game a single generation</p>
      <p><span>Space:</span> Starts or pauses the game running</p>
      <p><span>Numbers 1-5:</span> Set game speed</p>
      <p><span>E:</span> Toggle edge wrapping</p>
      <p></p>
      </div>
    </>
  )
}