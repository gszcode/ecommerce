const Enquiry = require('../models/enqModel')
const asyncHandler = require('express-async-handler')

// Create Enquiry
const createEnquiry = asyncHandler(async (req, res) => {
  try {
    const newEnquiry = await Enquiry.create(req.body)

    res.json(newEnquiry)
  } catch (error) {
    throw new Error(error)
  }
})

// Update Enquiry
const updateEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const updateEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true
    })

    res.json(updateEnquiry)
  } catch (error) {
    throw new Error(error)
  }
})

// Delete Enquiry
const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const deleteEnquiry = await Enquiry.findByIdAndDelete(id)

    res.json(deleteEnquiry)
  } catch (error) {
    throw new Error(error)
  }
})

// Get Enquiry
const getEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const getAEnquiry = await Enquiry.findById(id)

    res.json(getAEnquiry)
  } catch (error) {
    throw new Error(error)
  }
})

// Get all Enquiry
const getAllEnquiry = asyncHandler(async (req, res) => {
  try {
    const getEnquirys = await Enquiry.find()

    res.json(getEnquirys)
  } catch (error) {
    throw new Error(error)
  }
})

module.exports = {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getAllEnquiry
}
