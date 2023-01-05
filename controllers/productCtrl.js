const Product = require('../models/productModel')
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

module.exports = {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
}
