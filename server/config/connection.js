const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/dotodo-social')

module.exports = mongoose.connection
