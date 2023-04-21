require('dotenv').config()
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const morgan = require('morgan')
const cors = require('cors')

// Connection to DB
const dbConnect = require('./config/dbConnect')
const { notFound, errorHandler } = require('./middlewares/errorHandler')
dbConnect()

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors())

// Routes
const authRouter = require('./routes/authRoute')
const productRouter = require('./routes/productRoute')
const blogRouter = require('./routes/blogRoutes')
const categoryRouter = require('./routes/productCategoryRoute')
const blogCatRouter = require('./routes/blogCatRoute')
const brandRouter = require('./routes/brandRoute')
const colorRouter = require('./routes/colorRoute')
const couponRouter = require('./routes/couponRoute')
const enqRouter = require('./routes/enqRoute')
const uploadRouter = require('./routes/uploadRute')

app.use('/api/user', authRouter)
app.use('/api/product', productRouter)
app.use('/api/blog', blogRouter)
app.use('/api/category', categoryRouter)
app.use('/api/blogcategory', blogCatRouter)
app.use('/api/brand', brandRouter)
app.use('/api/color', colorRouter)
app.use('/api/coupon', couponRouter)
app.use('/api/enquiry', enqRouter)
app.use('/api/upload', uploadRouter)

// Error handler
app.use(notFound)
app.use(errorHandler)

// Initialization
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`)
})
