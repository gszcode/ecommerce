const { Schema, model, isObjectIdOrHexString } = require('mongoose')
const bcrypt = require('bcrypt')

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
    address: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Addres'
      }
    ],
    wishList: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    ]
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)

  next()
})

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = model('User', userSchema)
