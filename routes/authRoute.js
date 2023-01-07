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
  resetPassword
} = require('../controllers/userCtrl')

router.post('/register', createUser)
router.post('/forgot-password-token', forgotPassword)
router.put('/reset-password/:token', resetPassword)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.put('/password', authMiddleware, updatePassword)
router.get('/all-users', getUsers)
router.get('/refresh', handleRefreshToken)
router.get('/:id', authMiddleware, isAdmin, getUser)
router.put('/edit-user/:id', authMiddleware, updateUser)
router.delete('/:id', deleteUser)
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser)
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser)

module.exports = router
