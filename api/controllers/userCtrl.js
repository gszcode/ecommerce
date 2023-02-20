const User = require('../models/userModel')
const Product = require('../models/productModel')
const Cart = require('../models/cartModel')
const Counpon = require('../models/couponModel')
const Order = require('../models/orderModel')

const asyncHandler = require('express-async-handler')
const { generateToken } = require('../config/jwtToken')
const { generateRefreshToken } = require('../config/refreshToken')
const validateMongoDbId = require('../utils/validateMongodbId')
const jwt = require('jsonwebtoken')
const sendEmail = require('./emailCtrl')
const crypto = require('crypto')
const uniqid = require('uniqid')

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

// Login admin
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const findAdmin = await User.findOne({ email })
  if (findAdmin.role !== 'admin') throw new Error('Not Authorised')

  if (!findAdmin || !(await findAdmin.isPasswordMatched(password))) {
    throw new Error('Invalid Credentials')
  }

  const user = {
    _id: findAdmin._id,
    firstname: findAdmin.firstname,
    lastname: findAdmin.lastname,
    email: findAdmin.email,
    mobile: findAdmin.mobile
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
    const getAllUsers = await User.find({}).populate('wishlist')

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

// Get wishlist
const getWishlist = asyncHandler(async (req, res) => {
  const { id } = req.user

  try {
    const findUser = await User.findById(id).populate('wishlist')

    res.json(findUser)
  } catch (error) {
    throw new Error(error)
  }
})

// Save user address
const saveAddress = asyncHandler(async (req, res) => {
  const { id } = req.user

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        address: req?.body?.address
      },
      { new: true }
    )

    res.json(user)
  } catch (error) {
    throw new Error(error)
  }
})

// User cart
const userCart = asyncHandler(async (req, res) => {
  const { id } = req.user
  const { cart } = req.body

  try {
    let products = []

    const user = await User.findById(id)
    const alreadyExistCart = await Cart.findOne({ orderby: user.id })

    if (alreadyExistCart) {
      alreadyExistCart.remove()
    }

    for (let i = 0; i < cart.length; i++) {
      let object = {}

      object.product = cart[i].id
      object.count = cart[i].count
      object.color = cart[i].color

      const getPrice = await Product.findById(cart[i].id).select('price').exec()
      object.price = getPrice.price
      products.push(object)
    }

    let cartTotal = 0
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count
    }

    const newCart = await new Cart({
      products,
      cartTotal,
      orderby: user?.id
    }).save()

    res.json(newCart)
  } catch (error) {
    throw new Error(error)
  }
})

// Get user cart
const getUserCart = asyncHandler(async (req, res) => {
  const { id } = req.user

  try {
    const cart = await Cart.findOne({ orderby: id }).populate(
      'products.product'
    )

    res.json(cart)
  } catch (error) {
    throw new Error(error)
  }
})

// Empty cart
const emptyCart = asyncHandler(async (req, res) => {
  const { id } = req.user

  try {
    const cart = await Cart.findOne({ orderby: id })
    const deleteCart = await cart.remove()

    res.json(deleteCart)
  } catch (error) {
    throw new Error(error)
  }
})

// Apply coupon
const applyCoupon = asyncHandler(async (req, res) => {
  const { id } = req.user
  const { coupon } = req.body
  const validCoupon = await Counpon.findOne({ name: coupon })

  if (validCoupon === null) {
    throw new Error('Invalid Coupon')
  }

  let { cartTotal } = await Cart.findOne({ orderby: id }).populate(
    'products.product'
  )
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2)

  await Cart.findOneAndUpdate(
    { orderby: id },
    { totalAfterDiscount },
    { new: true }
  )

  res.json(totalAfterDiscount)
})

// Create order
const createOrder = asyncHandler(async (req, res) => {
  const { id } = req.user
  const { COD, couponApplied } = req.body

  try {
    if (!COD) throw new Error('Create cash order failed')

    const user = await User.findById(id)
    let userCart = await Cart.findOne({ orderby: user.id })
    let finalAmount = 0

    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmount = userCart.totalAfterDiscount
    } else {
      finalAmount = userCart.cartTotal
    }

    await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: 'COD',
        amount: finalAmount,
        status: 'Cash on Delivery',
        created: Date.now(),
        currency: 'usd'
      },
      orderby: user.id,
      orderStatus: 'Cash on Delivery'
    }).save()

    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { id: item.product.id },
          update: { $inc: { quantity: -item.count, sold: +item.count } }
        }
      }
    })

    await Product.bulkWrite(update, {})

    res.json({ message: 'Success' })
  } catch (error) {
    throw new Error(error)
  }
})

// Get orders
const getOrders = asyncHandler(async (req, res) => {
  const { id } = req.user

  try {
    const userOrders = await Order.findOne({ orderby: id })
      .populate('products.product')
      .exec()

    res.json(userOrders)
  } catch (error) {
    throw new Error(error)
  }
})

// Update order status
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  try {
    const orderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status
        }
      },
      { new: true }
    )

    res.json(orderStatus)
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
  deleteUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logoutUser,
  updatePassword,
  forgotPassword,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus
}
