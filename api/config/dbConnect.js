const mongoose = require('mongoose')

const dbConnect = () => {
  try {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.MONGO_URL)
    console.log('Database Connected Successfully')
  } catch (error) {
    console.log('Database error')
  }
}

module.exports = dbConnect
