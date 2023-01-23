const Category = require('../models/productCategoryModel')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validateMongodbId')

// Create category
const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body)

    res.json(newCategory)
  } catch (error) {
    throw new Error(error)
  }
})

// Update category
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const updateCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true
    })

    res.json(updateCategory)
  } catch (error) {
    throw new Error(error)
  }
})

// Delete category
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const deleteCategory = await Category.findByIdAndDelete(id)

    res.json(deleteCategory)
  } catch (error) {
    throw new Error(error)
  }
})

// Get category
const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const getACategory = await Category.findById(id)

    res.json(getACategory)
  } catch (error) {
    throw new Error(error)
  }
})

// Get all category
const getAllCategory = asyncHandler(async (req, res) => {
  try {
    const getCategorys = await Category.find()

    res.json(getCategorys)
  } catch (error) {
    throw new Error(error)
  }
})

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory
}
