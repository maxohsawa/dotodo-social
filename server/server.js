const path = require('path')
const express = require('express')
const db = require('./config/connection')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join('..', 'client', 'dist')))

db.once('open', () => {
  
  app.listen(PORT, () => {
    console.log(`Express server listening to port ${PORT}`)
  })
})