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
        ctx.fillRect(tcrds.x - 1, tcrds.y - 1, tileSize, tileSize)
      }
    }
    catch (err) {
      console.log(err)
    }
  }
}

export function clearCanvas (id) {
  const canvas = document.getElementById(id)
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

export const gridDraw = (tileSize) => {
  const bw = 500;
  const bh = 500;
  const p = 0;
  // const cw = bw + (p * 2) + 1;
  // const ch = bh + (p * 2) + 1;
  const canvas = document.getElementById('grid-canvas')
  const ctx = canvas.getContext('2d')
  for (let x = 0; x <= bw; x += 40) {
    ctx.moveTo(tileSize + x + p, p);
    ctx.lineTo(tileSize + x + p, bh + p);
  }


  for (let x = 0; x <= bh; x += 40) {
    ctx.moveTo(p, tileSize + x + p);
    ctx.lineTo(bw + p, tileSize + x + p);
  }

  ctx.strokeStyle = "black";
  ctx.stroke();
}