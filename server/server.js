const path = require('path')
const express = require('express')
const db = require('./config/connection')

const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginLandingPageDisabled } = require('@apollo/server/plugin/disabled')
const { typeDefs, resolvers } = require('./schema')

const { authMiddleware } = require('./utils/auth')

const PORT = process.env.PORT || 3001
const app = express()

const apolloServerComponents = {
  typeDefs,
  resolvers
}

apolloServerComponents.plugins = process.env.NODE_ENV === 'production' ? [ApolloServerPluginLandingPageDisabled()] : []

const server = new ApolloServer(apolloServerComponents)

const startApolloServer = async () => {
  
  await server.start()
  console.log('Apollo GraphQL Server started')
  
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }))

  if (process.env.NODE_ENV === 'production') {

    app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'))
    })
  }
  
  db.once('open', () => {
    console.log('MongoDB connection established')
    app.listen(PORT, () => {
      console.log(`Express server listening to port ${PORT}`)
      console.log('GraphQL portal can be reached at /graphql')
    })
  })
}

startApolloServer()