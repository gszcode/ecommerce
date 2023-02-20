const { Schema, model } = require('mongoose')

const brandSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Brand', brandSchema)
