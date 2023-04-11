const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token = req?.headers?.authorization.split(' ')[1]

  if (!token) {
    throw new Error('There is no token attached to header')
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(id)
    req.user = user

    next()
  } catch (error) {
    throw new Error('Not Authorized token expired, Please Login again')
  }
})

const isAdmin = asyncHandler(async (req, res, next) => {
  const { role } = req.user

  if (role !== 'admin') {
    throw new Error('You are not an admin')
  }

  next()
})

module.exports = { authMiddleware, isAdmin }
