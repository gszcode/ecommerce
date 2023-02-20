const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    mobile: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'user'
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    cart: {
      type: Array,
      default: []
    },
    address: {
      type: String
    },
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    ],
    refreshToken: {
      type: String
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
  },
  {
    timestamps: true
  }
)

// Hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)

  next()
})

// Compare password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Password token
userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString('hex')
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  this.passwordResetExpires = Date.now() + 30 * 60 * 1000

  return resetToken
}

module.exports = model('User', userSchema)
