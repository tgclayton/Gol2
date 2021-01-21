export default function Instructions(props) {
  return (
    <>
      <div className='control-panel instructions' >
      <h5>Rules</h5>
        <p>Conway's Game of Life consists of 2d game board composed of square cells.</p>
        <p>While the game is not running the game cells may be painted on or removed
           from the board by clicking and dragging with the mouse. The left mouse button will turn
           cells live and the right button will turn them dead. Holding the shift key while dragging
           will cause a rectangular block of cells to be affected. </p>
           <p>While edge wrapping is on cells on the edges of the map may count cells on the opposite
             edge as their neighbours, all cells on the board have the same number of neighbours. 
             While it is off the board edge act as a hard barrier and cells on the edge have less neighbours
             than other cells.
           </p>
      </div>

    </>
  )
}