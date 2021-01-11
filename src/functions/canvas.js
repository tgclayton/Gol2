export const canvasDraw = (field, liveCells, tileSize) => {
  // console.log('field:',field)
  // console.log('livecells:', liveCells)
  // console.log('tileSize:',tileSize)
  const canvas = document.getElementById('game-canvas')
  if (canvas) {
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    try {
      for (let i = 0; i < liveCells.length; i++) {
        const tcrds = field[liveCells[i]].canvasTileCrds
        ctx.fillStyle = '#008000'
        ctx.fillRect(tcrds.x -1, tcrds.y - 1, tileSize, tileSize)
      }
    } 
    catch (err) {
      console.log(err)
    }
  }
}