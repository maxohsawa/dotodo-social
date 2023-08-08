const { User, Thought } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
      }
      throw AuthenticationError
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password })
      const safeUser = {
        _id: user._id,
        username: user.username,
        email: user.email
      }
      const token = signToken(safeUser)
      return { 
        token, 
        user: safeUser
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email })

      if (!user) {
        throw AuthenticationError
      }

      const correctPw = await user.isCorrectPassword(password)

      if (!correctPw) {
        throw AuthenticationError
      }

      const safeUser = {
        _id: user._id,
        username: user.username,
        email: user.email
      }

      const token = signToken(safeUser)

      return { 
        token, 
        user: safeUser
      }
    },
  },
};

module.exports = resolvers
