const path = require('path')
const express = require('express')
const server = express()
const saves = require('./routes/saves.js')

server.use(express.json())
server.use(express.static(path.join(__dirname, 'build')))

server.use('/', saves)

module.exports = server
