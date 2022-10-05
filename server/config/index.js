const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
};

const uploadToCloudinary = (path) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(path, options, (err, result) => {
      if (err) {
        reject(err);
      }
      if (result) {
        resolve(result);
      }
    });
  });
};

module.exports = { cloudinary, options, uploadToCloudinary };
