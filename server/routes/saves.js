const express = require('express')
// const path = require('path')
const db = require('../db')

const router = express.Router()

router.get('/saves', function (req, res) {
  // console.log('got into saves get route')
  db.getSaves()
    .then(saves => {
      // console.log("saves in route:", saves)
      res.send(saves)
    })
    .catch(err => {
      console.log('error in route')
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
});

router.post('/saves', function (req, res) {
  // console.log('got into save post route')
  // console.log('body:', req.body)
  db.addSave(req.body)
  .then(() => {
    res.send('Saved')
  })
  .catch(err => {
    console.log('Save Error')
    res.status(500).send('DATABASE ERROR: ' + err.message)
  })
})

module.exports = router