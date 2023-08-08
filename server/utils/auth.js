const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.JWT_SECRET || 'mysecretsshhhhh'
const expiration = process.env.JWT_EXPIRATION || '24h'

module.exports = {
  
  authMiddleware: function (req, res, next) {

    let token = req.headers.authorization

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim()
    }

    if (!token) {
      return req
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration })
      next()
    } catch {
      return res.json({ message: 'invalid token' })
    }

  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id }

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration })
  },
};
