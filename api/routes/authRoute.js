const express = require('express')
const router = express.Router()
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const {
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
} = require('../controllers/userCtrl')

router.post('/register', createUser)
router.post('/forgot-password-token', forgotPassword)
router.put('/reset-password/:token', resetPassword)
router.put(
  '/order/update-order/:id',
  authMiddleware,
  isAdmin,
  updateOrderStatus
)
router.post('/login', loginUser)
router.post('/admin-login', loginAdmin)
router.get('/cart', authMiddleware, getUserCart)

router.post('/cart', authMiddleware, userCart)
router.get('/logout', logoutUser)
router.put('/password', authMiddleware, updatePassword)
router.get('/all-users', getUsers)
router.get('/get-orders', authMiddleware, getOrders)
router.get('/:id', getUser)

router.delete('/empty-cart', authMiddleware, emptyCart)
router.get('/refresh', handleRefreshToken)
router.put('/edit-user/:id', authMiddleware, updateUser)
router.get('/wishlist', authMiddleware, getWishlist)
router.post('/cart/applycoupon', authMiddleware, applyCoupon)
router.post('/cart/cash-order', authMiddleware, createOrder)

router.delete('/:id', deleteUser)
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser)
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser)
router.put('/save-address', authMiddleware, saveAddress)

module.exports = router
