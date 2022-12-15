/* A function that uploads images to cloudinary. */
import cloud from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

const cloudinary = cloud.v2;

if (typeof process.env.CLOUDINARY_CLOUD_NAME === 'undefined' || typeof process.env.CLOUDINARY_API_KEY === 'undefined' || typeof process.env.CLOUDINARY_API_SECRET === 'undefined') {
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

interface File {
  path: string;
  originalname: string;
}

const uploadToCloudinary = async (file: File) => {
  return cloudinary.uploader
    .upload(file.path ?? deafultPath, { ...options, public_id: `blog-app/${file.originalname ?? 'default_name'}` })
    .then((result) => ({
      assetId: result.asset_id,
      secureUrl: result.secure_url,
      originalName: result.original_filename,
    }))
    .catch((err) => {
      console.log(err);
    });
};

export { uploadToCloudinary };
