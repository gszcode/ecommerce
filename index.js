require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000

// Connection to DB
const dbConnect = require('./config/dbConnect')
const { notFound, errorHandler } = require('./middlewares/errorHandler')
dbConnect()

// // Middlewares
app.use(express.json())

// Routes
const authRouter = require('./routes/authRoute')
app.use('/api/user', authRouter)

// Error handler
app.use(notFound)
app.use(errorHandler)

// Initialization
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`)
})
