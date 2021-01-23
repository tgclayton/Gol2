import request from 'superagent'

export async function getSaves() {
  return request.get('/saves')
    .then(res => {
      // console.log("res:", res)
      return res.body
    })
    .catch(err => {
      console.log('error occurred')
      console.log(err)
    })
}

export async function saveGame(save) {
  return request.post('/saves')
    .send(save)
    .then(res => {
      console.log("saved")
    })
    .catch(err => {
      console.log('error occurred')
      console.log(err)
    })
}