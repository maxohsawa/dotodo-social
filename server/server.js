const path = require('path')
const express = require('express')
const db = require('./config/connection')

// test user model
const { User } = require('./models')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join('..', 'client', 'dist')))

// test user route & controller
app.post('/user', async (req, res) => {
  try {
    const { username, email, password } = req.body
    console.log(req.body)
    const newUser = await User.create({
      username,
      email,
      password
    })
    res.json(newUser)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

app.get('/user', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

db.once('open', () => {
  
  app.listen(PORT, () => {
    console.log(`Express server listening to port ${PORT}`)
  })
})