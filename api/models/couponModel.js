const { Schema, model } = require('mongoose')

const couponSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  expiry: {
    type: Date,
    required: true
  },
  discount: {
    type: Number,
    required: true
  }
})

module.exports = model('Coupon', couponSchema)
