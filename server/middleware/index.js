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
      if (file.fieldname === 'bg_image') {
        cb(null, `${path.join(path.dirname(__dirname), 'uploads/bg_image')}`);
      } else if (file.fieldname === 'profile_pic') {
        cb(null, `${path.join(path.dirname(__dirname), 'uploads/profile_pic')}`);
      }
    },
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}-${Date.now()}-${file.fieldname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const fileExtension = file.mimetype.split('/')[1];
    if (fileExtension in allowedFiles) {
      cb(null, false);
    }
    cb(null, true);
  },
});

module.exports = { upload };
