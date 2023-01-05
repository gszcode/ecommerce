require('dotenv').config()
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const morgan = require('morgan')

// Connection to DB
const dbConnect = require('./config/dbConnect')
const { notFound, errorHandler } = require('./middlewares/errorHandler')
dbConnect()

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

// Routes
const authRouter = require('./routes/authRoute')
const productRouter = require('./routes/productRoute')
app.use('/api/user', authRouter)
app.use('/api/product', productRouter)

// Error handler
app.use(notFound)
app.use(errorHandler)

// Initialization
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`)
})
