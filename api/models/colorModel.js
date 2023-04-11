const { Schema, model } = require('mongoose')

const colorSchema = new Schema(
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

module.exports = model('Color', colorSchema)
