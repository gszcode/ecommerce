const Product = require('../models/productModel')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

// Create product
const createProduct = asyncHandler(async (req, res) => {
  const { title } = req.body

  try {
    if (title) {
      req.body.slug = slugify(title)
    }

    const newProduct = await Product.create(req.body)

    res.json(newProduct)
  } catch (error) {
    throw new Error(error)
  }
})

// Update product
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params
  const newData = req.body

  try {
    if (newData.title) {
      req.body.slug = slugify(newData.title)
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, newData, {
      new: true
    })

    res.json(updatedProduct)
  } catch (error) {
    throw new Error(error)
  }
})

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const deletedProduct = await Product.findByIdAndRemove(id)

    res.json(deletedProduct)
  } catch (error) {
    throw new Error(error)
  }
})

// Get product
const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const findProduct = await Product.findById(id)

    res.json(findProduct)
  } catch (error) {
    throw new Error(error)
  }
})

// Get all products
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query }
    const excludeFields = ['page', 'sort', 'limit', 'fields']
    excludeFields.forEach((field) => delete queryObj[field])

    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)

    let query = Product.find(JSON.parse(queryStr))

    // Sorting
    const { sort } = req.query

    if (sort) {
      const sortBy = sort.split(',').join(' ')
      query = query.sort(sortBy)
    } else {
      query = query.sort('-createdAt')
    }

    // Limiting fields
    const { fields } = req.query

    if (fields) {
      const getFields = fields.split(',').join(' ')
      query = query.select(getFields)
    } else {
      query = query.select('-__v')
    }

    // Pagination
    const { page } = req.query
    const { limit } = req.query
    const skip = (page - 1) * limit

    query = query.skip(skip).limit(limit)
    if (page) {
      const productCount = await Product.countDocuments()

      if (skip >= productCount) throw new Error('This Page does not exists')
    }

    //pag 1, prod 3, prod.omitidos 0 - pag 2, prod 3, prod.omitidos 3
    // console.log(page, limit, skip) // 1 - 3 - 0 | 2 - 3 - 3

    const product = await query
    res.json(product)
  } catch (error) {
    throw new Error(error)
  }
})

// Add to wishlist
const addToWishList = asyncHandler(async (req, res) => {
  const { id } = req.user
  const { prodId } = req.body

  try {
    const user = await User.findById(id)
    const alreadyAdded = user.wishlist.find(
      (id) => id.toString() === prodId.toString()
    )

    if (alreadyAdded) {
      let user = await User.findByIdAndUpdate(
        id,
        {
          $pull: { wishlist: prodId }
        },
        { new: true }
      )

      res.json(user)
    } else {
      let user = await User.findByIdAndUpdate(
        id,
        {
          $push: { wishlist: prodId }
        },
        { new: true }
      )

      res.json(user)
    }
  } catch (error) {
    throw new Error(error)
  }
})

// Add rating
const rating = asyncHandler(async (req, res) => {
  const { id } = req.user
  const { star, prodId, comment } = req.body

  try {
    const product = await Product.findById(prodId)
    const alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === id
    )

    if (alreadyRated) {
      await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated }
        },
        {
          $set: { 'ratings.$.star': star, 'ratings.$.comment': comment }
        },
        {
          new: true
        }
      )
    } else {
      await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star,
              comment,
              postedby: id
            }
          }
        },
        {
          new: true
        }
      )
    }

    const getAllRatings = await Product.findById(prodId)
    let totalRating = getAllRatings.ratings.length
    let ratingSum = getAllRatings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0)
    let actualRating = Math.round(ratingSum / totalRating)

    const finalProduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalratings: actualRating
      },
      { new: true }
    )

    res.json(finalProduct)
  } catch (error) {
    throw new Error(error)
  }
})

module.exports = {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating
}
