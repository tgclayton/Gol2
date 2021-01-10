export const canvasDraw = (field, liveCells, tileSize) => {
  const canvas = document.getElementById('game-canvas')
  if (canvas) {
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < liveCells.length; i++) {
      const tcrds = field[liveCells[i]].canvasTileCrds
      ctx.fillStyle = '#008000'
      if (i === 50) {
        console.log(tcrds)
      }
      ctx.fillRect(tcrds.x, tcrds.y -1, tileSize, tileSize)
    }
  }
}