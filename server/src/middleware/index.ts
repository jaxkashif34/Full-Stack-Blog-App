/* The above code is creating a multer middleware that will upload the files to the specified
directory. */
import path from 'path';
import multer from 'multer';

const allowedFiles = {
  jpg: 'jpg',
  jpeg: 'jpeg',
  webp: 'webp',
  png: 'png',
};
export const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === 'postImg') {
        cb(null, `${path.join(path.dirname(__dirname), 'uploads/postImg')}`);
      } else if (file.fieldname === 'ProfilePic') {
        cb(null, `${path.join(path.dirname(__dirname), 'uploads/ProfilePic')}`);
      } else {
        console.log('Filde name is not matched');
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
