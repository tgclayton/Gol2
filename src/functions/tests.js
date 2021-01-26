function testSet() {
  const set = new Set([])
  let count = 0
  for (let i = 0; i < 1000000000; i++){
    set.add(i)
  }
  const start = new Date()
  set.forEach(n => {
    count++
  })    
  console.log(count)
  const end = new Date()
  console.log("Set lookup time =", end - start)
}

function testArray() {
  const start = new Date()
  const array = new Array(1000000000)
  array.fill(0)
  // let count = 0
  array.forEach(n => {
    // count++
  })
  const end = new Date()
  console.log("Array lookup time =", end-start)
}

testSet()
testArray()