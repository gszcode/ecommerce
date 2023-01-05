const express = require('express')
const router = express.Router()
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
} = require('../controllers/productCtrl')

router.post('/', authMiddleware, isAdmin, createProduct)
router.get('/:id', getProduct)
router.put('/:id', authMiddleware, isAdmin, updateProduct)
router.delete('/:id', authMiddleware, isAdmin, deleteProduct)
router.get('/', getAllProducts)

module.exports = router
