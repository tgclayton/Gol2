const express = require('express')
// const path = require('path')
const db = require('../db')

const router = express.Router()

//GET /saves
router.get('/saves', function (req, res) {
  db.getSaves()
    .then(saves => {
      console.log("saves in route:", saves)
      res.send(saves)
    })
    .catch(err => {
      console.log('error in route')
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
});

module.exports = router