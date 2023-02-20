const { Schema, model } = require('mongoose')

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    numViews: {
      type: Number,
      default: 0
    },
    isLiked: {
      type: Boolean,
      default: false
    },
    isDisliked: {
      type: Boolean,
      default: false
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    image: {
      type: String,
      default: 'https://www.ycoinbound.com/hubfs/blog.jpg'
    },
    author: {
      type: String,
      default: 'Admin'
    },
    images: []
  },
  {
    toJSON: {
      virtuales: true
    },
    toObject: {
      virtuales: true
    },
    timestamsp: true
  }
)

module.exports = model('Blog', blogSchema)
