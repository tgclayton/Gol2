import request from 'superagent'

export async function getSaves() {
  return request.get('/saves')
    .then(res => {
      console.log("res:", res)
      return res.body
    })
    .catch(err => {
      console.log('error occurred')
      console.log(err)
    })
}