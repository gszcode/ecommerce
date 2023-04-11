const Color = require('../models/colorModel')
const asyncHandler = require('express-async-handler')

// Create Color
const createColor = asyncHandler(async (req, res) => {
  try {
    const newColor = await Color.create(req.body)

    res.json(newColor)
  } catch (error) {
    throw new Error(error)
  }
})

// Update Color
const updateColor = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const updateColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true
    })

    res.json(updateColor)
  } catch (error) {
    throw new Error(error)
  }
})

// Delete Color
const deleteColor = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const deleteColor = await Color.findByIdAndDelete(id)

    res.json(deleteColor)
  } catch (error) {
    throw new Error(error)
  }
})

// Get Color
const getColor = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const getAColor = await Color.findById(id)

    res.json(getAColor)
  } catch (error) {
    throw new Error(error)
  }
})

// Get all Color
const getAllColor = asyncHandler(async (req, res) => {
  try {
    const getColors = await Color.find()

    res.json(getColors)
  } catch (error) {
    throw new Error(error)
  }
})

module.exports = {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getAllColor
}
