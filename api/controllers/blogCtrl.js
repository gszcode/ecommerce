const Blog = require('../models/blogModel')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validateMongodbId')
const cloudinaryUploadImg = require('../utils/cloudinary')

// Create blog
const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body)

    res.json(newBlog)
  } catch (error) {
    throw new Error(error)
  }
})

// Update blog
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true
    })

    res.json(updateBlog)
  } catch (error) {
    throw new Error(error)
  }
})

// Get blog
const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const getBlog = await Blog.findById(id)
      .populate('likes')
      .populate('dislikes')

    await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 }
      },
      {
        new: true
      }
    )

    res.json(getBlog)
  } catch (error) {
    throw new Error(error)
  }
})

// Get all blog
const getAllBlog = asyncHandler(async (req, res) => {
  try {
    const getBlogs = await Blog.find()

    res.json(getBlogs)
  } catch (error) {
    throw new Error(error)
  }
})

// Delete blog
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const deleteBlog = await Blog.findByIdAndDelete(id)

    res.json(deleteBlog)
  } catch (error) {
    throw new Error(error)
  }
})

// Like blog
const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body

  try {
    // find the blog which you want to be liked
    const blog = await Blog.findById(blogId)
    // find the login user
    const loginUserId = await req?.user?._id
    // find if the user has liked the blog
    const isLiked = await blog?.isLiked
    // find if the user has dislike the blog
    const alreadyDisliked = blog?.dislikes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    )

    if (alreadyDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false
        },
        { new: true }
      )

      res.json(blog)
    }

    if (isLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false
        },
        { new: true }
      )

      res.json(blog)
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: loginUserId },
          isLiked: true
        },
        { new: true }
      )

      res.json(blog)
    }

    res.json(deleteBlog)
  } catch (error) {
    throw new Error(error)
  }
})

// Dislike blog
const dislikeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body

  try {
    // find the blog which you want to be liked
    const blog = await Blog.findById(blogId)
    // find the login user
    const loginUserId = await req?.user?._id
    // find if the user has liked the blog
    const isDisliked = await blog?.isDisliked
    // find if the user has dislike the blog
    const alreadyLiked = blog?.likes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    )

    if (alreadyLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false
        },
        { new: true }
      )

      res.json(blog)
    }

    if (isDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false
        },
        { new: true }
      )

      res.json(blog)
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { dislikes: loginUserId },
          isDisliked: true
        },
        { new: true }
      )

      res.json(blog)
    }

    res.json(deleteBlog)
  } catch (error) {
    throw new Error(error)
  }
})

// Upload images
const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)

  try {
    const uploader = (path) => cloudinaryUploadImg(path, 'images')
    const urls = []
    const files = req.files

    for (const file of files) {
      const path = file
      const newpath = await uploader(path)

      urls.push(newpath)
      fs.unlinkSync(path)
    }

    const findBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => file)
      },
      { new: true }
    )

    res.json(findBlog)
  } catch (error) {
    throw new Error(error)
  }
})

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadImages
}
