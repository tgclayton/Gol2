export const makeRandomMap = (size) => {
  const tileTotal = size * size
  const field = new Array(tileTotal).fill(0)
  let newField = []
  let liveCount = 0
  let checkSet = new Set()
  newField = field.map((tile, idx) => {
    let rand = Math.random()
    if (rand > 0.9) {
      let neighbours = getNeighbours(idx, size)
      tile = 1
      liveCount++
      neighbours.forEach(n => checkSet.add(n))
      // checkSet = new Set([...checkSet, ...neighbours])
    }
    return tile
  })
  return { map: newField, liveCells: liveCount, checkSet: checkSet }
}