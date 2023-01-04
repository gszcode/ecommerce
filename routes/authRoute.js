const express = require('express')
const router = express.Router()
const {
  createUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/userCtrl')

router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/all-users', getUsers)
router.get('/user/:id', getUser)
router.put('/update-user/:id', updateUser)
router.delete('/delete-user/:id', deleteUser)

module.exports = router
