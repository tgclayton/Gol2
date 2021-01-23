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
    .catch(err => {
      console.log('error occurred:')
      console.log(err)
    })
}

export async function delSave(id) {

}