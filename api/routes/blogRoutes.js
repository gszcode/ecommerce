const express = require('express')
const router = express.Router()
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const { uploadPhoto, blogImgResize } = require('../middlewares/uploadImages')
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadImages
} = require('../controllers/blogCtrl')

router.post('/', authMiddleware, isAdmin, createBlog)
router.put(
  '/upload/:id',
  authMiddleware,
  isAdmin,
  uploadPhoto.array('images'),
  blogImgResize,
  uploadImages
)
router.put('/likes', authMiddleware, likeBlog)
router.put('/dislikes', authMiddleware, dislikeBlog)
router.put('/:id', authMiddleware, isAdmin, updateBlog)
router.get('/:id', getBlog)
router.get('/', getAllBlog)
router.delete('/:id', authMiddleware, isAdmin, deleteBlog)

module.exports = router
