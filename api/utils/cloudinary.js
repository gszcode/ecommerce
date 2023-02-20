const cloudinary = require('cloudinary')
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  apy_key: process.env.APY_KEY,
  api_secret: process.env.API_SECRET
})

const cloudinaryUploadImg = async (fileToUploads) => {
  return new Promise((resolve) => {
    cloudinary.UploadStream.upload(fileToUploads, (result) => {
      resolve(
        {
          url: result.secure_url
        },
        {
          resource_type: 'auto'
        }
      )
    })
  })
}

module.exports = cloudinaryUploadImg
