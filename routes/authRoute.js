const express = require('express')
const router = express.Router()
const {
  createUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  blockUser,
  unblockUser
} = require('../controllers/userCtrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')

router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/all-users', getUsers)
router.get('/:id', authMiddleware, isAdmin, getUser)
router.put('/edit-user/:id', authMiddleware, updateUser)
router.delete('/:id', deleteUser)
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser)
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser)

module.exports = router
