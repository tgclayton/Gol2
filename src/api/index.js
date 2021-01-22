import request from 'superagent'

export async function getSaves() {
  return request.get('/saves')
    .then(res => {
      return res.body
    })
}