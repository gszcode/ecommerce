const { Schema, model } = require('mongoose')

const blogCategorySchema = new Schema(
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

module.exports = model('BCategory', blogCategorySchema)
