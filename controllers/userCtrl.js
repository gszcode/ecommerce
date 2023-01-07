const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const { generateToken } = require('../config/jwtToken')
const { generateRefreshToken } = require('../config/refreshToken')
const validateMongoDbId = require('../utils/validateMongodbId')
const jwt = require('jsonwebtoken')
const sendEmail = require('./emailCtrl')
const crypto = require('crypto')

// Create user
const createUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, mobile, password } = req.body

  const findUser = await User.findOne({ email })
  if (findUser) {
    throw new Error('User Already Exist')
  }

  const newUser = await User.create({
    firstname,
    lastname,
    email,
    mobile,
    password
  })

  res.json(newUser)
})

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const findUser = await User.findOne({ email })
  if (!findUser || !(await findUser.isPasswordMatched(password))) {
    throw new Error('Invalid Credentials')
  }

  const user = {
    _id: findUser._id,
    firstname: findUser.firstname,
    lastname: findUser.lastname,
    email: findUser.email,
    mobile: findUser.mobile
  }

  const token = generateToken(user._id)
  const refreshToken = generateRefreshToken(user._id)

  await User.findByIdAndUpdate(
    user._id,
    { refreshToken },
    {
      new: true
    }
  )

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 72 * 60 * 60 * 1000
  })

  res.json({ user, token })
})

// Handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies

  if (!refreshToken) {
    throw new Error('No Refresh Token in Cookies')
  }

  const user = await User.findOne({ refreshToken })
  if (!user) {
    throw new Error('No Refresh token present in db or not matched')
  }

  const { id } = jwt.verify(refreshToken, process.env.JWT_SECRET)
  if (!id || id !== user.id) {
    throw new Error('There is something wrong with refresh token')
  }

  const accessToken = generateToken(user.id)

  res.json(accessToken)
})

// Logout user
const logoutUser = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies

  if (!refreshToken) {
    throw new Error('No Refresh Token in Cookies')
  }

  const user = await User.findOne({ refreshToken })
  if (!user) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true
    })
    return res.sendStatus(204)
  }

  await User.findOneAndUpdate(refreshToken, {
    refreshToken: ''
  })

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true
  })
  res.sendStatus(204)
})

// Get all users
const getUsers = asyncHandler(async (req, res) => {
  try {
    const getAllUsers = await User.find({})

    res.json(getAllUsers)
  } catch (error) {
    throw new Error(error)
  }
})

// Get a user
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)

  try {
    const getAUser = await User.findById(id)

    res.json({ getAUser })
  } catch (error) {
    throw new Error(error)
  }
})

// Update a user
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.user
  const newData = req.body
  validateMongoDbId(id)

  try {
    const updatedUser = await User.findByIdAndUpdate(id, newData, {
      new: true
    })

    res.json(updatedUser)
  } catch (error) {
    throw new Error(error)
  }
})

// Delete a user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)

  try {
    const deletedUser = await User.findByIdAndRemove(id)

    res.json(deletedUser)
  } catch (error) {
    throw new Error(error)
  }
})

// Block user
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)

  try {
    await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true
      },
      { new: true }
    )

    res.json({
      message: 'User Blocked'
    })
  } catch (error) {
    throw new Error(error)
  }
})

// Unblock user
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)

  try {
    await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false
      },
      { new: true }
    )

    res.json({
      message: 'User Unblocked'
    })
  } catch (error) {
    throw new Error(error)
  }
})

// Update password
const updatePassword = asyncHandler(async (req, res) => {
  const { id } = req.user
  const { password } = req.body
  validateMongoDbId(id)

  const user = await User.findById(id)
  if (!password) {
    res.json(user)
  }

  user.password = password
  const updatedPassword = await user.save()

  res.json(updatedPassword)
})

// Forgot password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })

  if (!user) throw new Error('User not found with this email')

  try {
    const token = await user.createPasswordResetToken()
    await user.save()

    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</a>`
    const data = {
      to: email,
      subject: 'Forgot Password Link',
      text: 'Hey User',
      html: resetURL
    }

    sendEmail(data)
    res.json(token)
  } catch (error) {
    throw new Error(error)
  }
})

// Reset password
const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params
  const { password } = req.body
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  })

  if (!user) throw new Error('Token Expired, Please try again later')
  user.password = password
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined

  await user.save()
  res.json(user)
})

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logoutUser,
  updatePassword,
  forgotPassword,
  resetPassword
}
