/* A function that uploads images to cloudinary. */
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();

if (typeof (process.env.CLOUDINARY_CLOUD_NAME === 'undefined' || process.env.CLOUDINARY_API_KEY === 'undefined' || process.env.CLOUDINARY_API_SECRET === 'undefined')) {
  console.warn('!! cloudinary config is undefined !!');
}
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

const deafultPath = 'https://image.shutterstock.com/image-vector/default-word-digital-style-glowing-260nw-1668796114.jpg';

const uploadToCloudinary = (path = deafultPath) => {
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
