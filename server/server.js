const path = require('path')
const express = require('express')
const server = express()
const saves = require('./routes/saves.js')

// const users = require('../routes/users')

server.use(express.json())
console.log('dirname:', __dirname)
server.use(express.static(path.join(__dirname, 'build')))

server.use('/', saves)

module.exports = server
