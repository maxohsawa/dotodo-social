const path = require('path')
const express = require('express')
const db = require('./config/connection')

// test user model
const { User } = require('./models')
const { signToken, authMiddleware } = require('./utils/auth')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join('..', 'client', 'dist')))

// test user route & controller
app.post('/user', async (req, res) => {
  try {
    const { username, email, password } = req.body
    const newUser = await User.create({
      username,
      email,
      password
    })
    const token = signToken(newUser)
    res.json({ newUser, token })
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

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(403).json({ message: "No matching username" })
    }

    const correctPassword = await user.isCorrectPassword(password)
    if (!correctPassword) {
      return res.status(403).json({ message: "Password is incorrect" })
    }
    
    const safeUser = {
      username: user.username,
      email: user.email
    }

    const token = signToken(safeUser)
    res.json({ token, user: safeUser })
  } catch(error) {
    console.error(error)
    res.status(500).json(error)
  }
})

app.get('/secret', authMiddleware, (req, res) => {
  console.log(req.user)
  res.json({ message: "shooby dooby"})
})

db.once('open', () => {
  
  app.listen(PORT, () => {
    console.log(`Express server listening to port ${PORT}`)
  })
})