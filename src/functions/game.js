const cellTruthTable = {
  0: {
    0: 0,
    1: 0,
    2: 0,
    3: 1,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0
  },
  1: {
    0: 0,
    1: 0,
    2: 1,
    3: 1,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0
  }
}

//Creats an object containing
export const createField = (size, tileSize) => {
  const field = {}
  // const tileSize = 2
  for (let i = 0; i < size * size; i++) {
    field[i] = {
      neighbours: {
        wrappedNeighbours: getNeighbours(i, size, true),
        unWrappedNeighbours: getNeighbours(i, size, false),
      },
      canvasTileCrds: canvasTileCoords(i, size, tileSize),
    }
  }
  return field
}

//Produces a list of index values of living cells
export const newMakeRandomMap = (size) => {
  const total = size * size
  const liveCells = new Set([])
  for (let i = 0; i < total; i++) {
    let rand = Math.random()
    if (rand > 0.8) {
      liveCells.add(i)
    }
  }
  // console.log('livecells:', liveCells)
  return liveCells
}

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

//nextGen function built for GoL2
export function makeNextGen(liveIdxs, size, field, wrap) {
const neighbours = wrap? 'wrappedNeighbours': 'unWrappedNeighbours'
const length = (size*size) -1
const newLiveIdxs = new Set([])
  for (let i = 0; i < length - 1; i++) {
    const oldVal = liveIdxs.has(i)? 1: 0
    const n = field[i].neighbours[neighbours]
    const ln = findLiveNeighbours(liveIdxs, n)
    const newVal = cellTruthTable[oldVal][ln]
    if (newVal === 1){
      newLiveIdxs.add(i)
    }
  }
  return newLiveIdxs
}

export function idxToCoords(idx, size) {
  const x = idx % size
  const y = Math.floor(idx / size)
  return { x: x, y: y }
}

export function canvasTileCoords(idx, size, tileSize) {
  const coords = idxToCoords(idx, size)
  coords.x *= tileSize
  coords.x++
  coords.y *= tileSize
  coords.y++
  return coords
}

export function canvasGridCoords(idx, size, tileSize) {
  const coords = idxToCoords(idx, size)
  coords[0] *= tileSize
  coords[1] *= tileSize
  return coords
}

export function coordsToIdx(crds, size, wrap) {
  if (wrap) {
    if (crds.x > (size - 1)) {
      crds.x = 0
    } else if (crds.x < 0) {
      crds.x = size - 1
    }
    if (crds.y > (size - 1)) {
      crds.y = 0
    } else if (crds.y < 0) {
      crds.y = size - 1
    }
    // console.log(crds)
  } else {
    if (crds.x > (size - 1) || crds.x < 0 || crds.y > (size - 1) || crds.y < 0) {
      return 'bad'
    }
  }
  const y = crds.y * size
  const idx = crds.x + y
  return idx
}

export function getNeighbours(idx, size, wrap) {
  let neighbours = []
  const crds = idxToCoords(idx, size)
  // console.log(crds)
  neighbours.push(coordsToIdx({ x: crds.x - 1, y: crds.y - 1 }, size, wrap))
  neighbours.push(coordsToIdx({ x: crds.x - 1, y: crds.y }, size, wrap))
  neighbours.push(coordsToIdx({ x: crds.x - 1, y: crds.y + 1 }, size, wrap))
  neighbours.push(coordsToIdx({ x: crds.x, y: crds.y - 1 }, size, wrap))
  neighbours.push(coordsToIdx({ x: crds.x, y: crds.y + 1 }, size, wrap))
  neighbours.push(coordsToIdx({ x: crds.x + 1, y: crds.y - 1 }, size, wrap))
  neighbours.push(coordsToIdx({ x: crds.x + 1, y: crds.y }, size, wrap))
  neighbours.push(coordsToIdx({ x: crds.x + 1, y: crds.y + 1 }, size, wrap))
  neighbours = neighbours.filter(n => n !== 'bad')
  return neighbours
}

export function findLiveNeighbours(liveCells, neighbours) {
  let ln = 0
  neighbours.forEach(n => {
    if(liveCells.has(n)){
      ln++
    }
  })
  return ln
}
