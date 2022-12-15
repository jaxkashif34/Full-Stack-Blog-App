import { Response } from 'express';
import { uploadToCloudinary } from '../../config/cloudniary-config';
import { upload } from '../../middleware';
import { hashPassword } from '../../utils/Encryption';
import { errors } from '../../utils/errors';
import { GetUserAuthInfoRequest } from '../../utils/request';
import { verifyToken } from '../../utils/token';
import { editUserValidation } from '../../utils/validation/editUser';
import { updateInDatabase } from './utils/upDateInDB';
export const editUser = [
  verifyToken('accessToken'),
  upload.single('ProfilePic'),
  ...editUserValidation,
  async (req: GetUserAuthInfoRequest, res: Response) => {
    if (errors(req).length > 0) return res.status(400).json({ errors: errors(req) });
    const { id } = req.params;
    const file = req.file;
    const { name, email, password, role, DOB, emailUpdates } = req.body;

    const userData = {
      ...(name != null && { name }),
      ...(email != null && { email }),
      ...(password != null && { password: await hashPassword(password) }),
      ...(role != null && { role }),
      ...(DOB != null && { DOB: new Date(DOB) }),
      ...(emailUpdates != null && { emailUpdates }),
    };
    const imgData = file != null && (await uploadToCloudinary({ path: file.path, originalname: file.originalname }));
    if (id === req.user?.id || req.user?.role === 'ADMIN') {
      updateInDatabase(userData, imgData, id);
      res.json("User's data has been updated");
    } else {
      // show UnAuthorized error
      res.status(401).json({ errors: 'UnAuthorized' });
    }
  },
];
