const path = require('path');
const multer = require('multer');

const allowedFiles = {
  jpg: 'jpg',
  jpeg: 'jpeg',
  webp: 'webp',
  png: 'png',
};

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${path.join(__dirname, 'uploads')}`);
    },
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}- ${file.fieldname}- ${Date.now()}-${file.mimetype.split('/')[1]}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const fileExtension = file.mimetype.split('/')[1];
    console.log(fileExtension);
    console.log(fileExtension in allowedFiles);
    if (fileExtension in allowedFiles) {
      cb(null, false);
    }
    cb(null, true);
  },
}).single('bg_image');

module.exports = upload;
