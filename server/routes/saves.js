const express = require('express')
// const path = require('path')
const db = require('../db')

const router = express.Router()

router.get('/', function(req, res) {
  db.getSaves()
  .then(saves => {
    res.send(saves)
  })
  .catch(err => {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  })
});

//POST /users/add
router.post('/add', (req, res) => {
  db.addSave(req.body)
  .then(x => {
    res.send('Ok')
  })
  .catch(err => {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  })
})

module.exports = router