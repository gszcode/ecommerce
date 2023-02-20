// Not found
const notFound = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`)

  res.status(404)
  next(error)
}

// Error handler
const errorHandler = (err, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode

  res.status(statusCode)
  res.json({
    message: err?.message,
    stack: err?.stack
  })

  next()
}

module.exports = { notFound, errorHandler }
