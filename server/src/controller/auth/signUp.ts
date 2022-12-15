import { GetUserAuthInfoRequest } from '../../utils/request';
import { sigUpValidation } from '../../utils/validation/signUp';
import { Response } from 'express';
import { errors } from '../../utils/errors';
import { hashPassword } from '../../utils/Encryption';
import { saveInDabases } from './utils/saveInDB';
import { uploadToCloudinary } from '../../config/cloudniary-config';
import { upload } from '../../middleware';
import { setToken } from '../../utils/token';
export const signUp = [
  upload.single('ProfilePic'),
  ...sigUpValidation,
  async (req: GetUserAuthInfoRequest, res: Response) => {
    const { name, email, password, role, DOB, emailUpdates } = req.body;
    const { originalname, path } = req.file;
    if (errors(req).length > 0) return res.status(400).json({ errors: errors(req) });
    const userDetails = {
      name,
      email,
      role,
      emailUpdates: JSON.parse(emailUpdates),
      DOB: new Date(DOB),
      password: await hashPassword(password),
    };
    const imgData = await uploadToCloudinary({ path, originalname });
    // res.json({ imgData });
    const user = await saveInDabases(userDetails, imgData);
    await setToken(res, { id: user.id, name: user.name, role: user.role, emailUpdates: user.emailUpdates });
    res.json({ message: 'user created successfully' });
  },
];
