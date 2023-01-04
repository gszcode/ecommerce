const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const { generateToken } = require('../config/jwtToken')

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

  res.json({ user, token })
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

  try {
    const getAUser = await User.findById(id)

    res.json(getAUser)
  } catch (error) {
    throw new Error(error)
  }
})

// Update a user
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  const newData = req.body

  try {
    const updatedUser = await User.findByIdAndUpdate(id, newData, {
      new: true
    })
    console.log(updatedUser)

    res.json(updatedUser)
  } catch (error) {
    throw new Error(error)
  }
})

// Delete a user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const deletedUser = await User.findByIdAndRemove(id)

    res.json(deletedUser)
  } catch (error) {
    throw new Error(error)
  }
})

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
}
