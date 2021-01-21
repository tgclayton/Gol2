export default function Instructions(props) {
  return (
    <>
      <div className='control-panel instructions' id='game-instructions' style={{
        letterSpacing:'-0.001em'
      }} >
        {/* <h5 className={'panel-title'}>Rules</h5> */}
        <p>Conway's Game of Life consists of 2D game board composed of square cells. Each cell can
        exist in one of two states, alive(green) and dead(grey). Once the starting state of the
        board is determined the game proceeds in a series of generations, during which cells may
          change state according to three rules.</p>
        <p style={{marginBottom:'0'}}>1: Any live cell with two or three live neighbours survives.</p>
        <p style={{marginBottom:'0'}}>2: Any dead cell with three live neighbours becomes a live cell.</p>
        <p>3: All other live cells die or stay dead.</p>

        <p>While the game is not running the game cells may be painted on or removed
        from the board by clicking and dragging with the mouse. The left mouse button will turn
        cells live and the right button will turn them dead. Holding the shift key while dragging
           will cause a rectangular block of cells to be affected. </p>

        <p>While edge wrapping is on cells on the edges of the map may count cells on the opposite
        edge as their neighbours.While it is off the board edge act as a hard barrier and cells on
        the edge have no neighbours off the board edge.
           </p>
      </div>

    </>
  )
}