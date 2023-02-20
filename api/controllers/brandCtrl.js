const Brand = require('../models/brandModel')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validateMongodbId')

// Create Brand
const createBrand = asyncHandler(async (req, res) => {
  try {
    const newbrand = await Brand.create(req.body)

    res.json(newbrand)
  } catch (error) {
    throw new Error(error)
  }
})

// Update brand
const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const updatebrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true
    })

    res.json(updatebrand)
  } catch (error) {
    throw new Error(error)
  }
})

// Delete brand
const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const deletebrand = await Brand.findByIdAndDelete(id)

    res.json(deletebrand)
  } catch (error) {
    throw new Error(error)
  }
})

// Get brand
const getBrand = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const getAbrand = await Brand.findById(id)

    res.json(getAbrand)
  } catch (error) {
    throw new Error(error)
  }
})

// Get all brand
const getAllBrand = asyncHandler(async (req, res) => {
  try {
    const getbrands = await Brand.find()

    res.json(getbrands)
  } catch (error) {
    throw new Error(error)
  }
})

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getAllBrand
}
