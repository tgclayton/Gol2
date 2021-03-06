
//Renders cells on the game canvas
export const canvasDraw = (field, liveCells, tileSize) => {
  const canvas = document.getElementById('game-canvas')
  if (canvas) {
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    try {
      liveCells.forEach(i => {
        const tcrds = field[i].canvasTileCrds
        ctx.fillStyle = '#008000'
        ctx.fillRect(tcrds.x - 1, tcrds.y - 1, tileSize, tileSize)
      });
    }
    catch (err) {
      console.log(err)
    }
  }
}

//Blanks the canvas
export function clearCanvas (id) {
  const canvas = document.getElementById(id)
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

//Draws properly sized grid on the grid canvas
export const gridDraw = (tileSize, fieldSize) => {
  const p = 0;
  const canvas = document.getElementById('grid-canvas')
  canvas.width = 500
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.lineWidth = .2
  for (let x = 0; x <= 500 ; x += 500 / fieldSize) {
    ctx.moveTo(tileSize + x + p, p);
    ctx.lineTo(tileSize + x + p, 500 + p);
  }
  for (let x = 0; x <= 500 ; x += 500 / fieldSize) {
    ctx.moveTo(p, tileSize + x + p);
    ctx.lineTo(500 + p, tileSize + x + p);
  }
  ctx.strokeStyle = "black";
  ctx.stroke();
}