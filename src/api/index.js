import request from 'superagent'

export async function getSaves() {
  return request.get('/saves')
    .then(res => {
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
      return "Success"
    })
    .catch(err => {
      console.log('error occurred:')
      console.log(err)
    })
}

export async function delSave(title) {
  console.log('title in api:', title)
  return request.del('/saves')
    .send({ title })
    .then(res => {
      return "Success"
    })
    .catch(err => {
      console.log('error occurred:')
      console.log(err)
    })
}