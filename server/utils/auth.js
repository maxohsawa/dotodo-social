const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.JWT_SECRET || 'mysecretsshhhhh'
const expiration = process.env.JWT_EXPIRATION || '24h'

const { GraphQLError } = require('graphql');

module.exports = {
  
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id }

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration })
  },
};
