import { Response } from 'express';
import { uploadToCloudinary } from '../../config/cloudniary-config';
import { upload } from '../../middleware';
import { errors } from '../../utils/errors';
import { GetUserAuthInfoRequest } from '../../utils/request';
import { verifyToken } from '../../utils/token';
import { editPostValidaiton } from '../../utils/validation/posts/editPostValidation';
import { editInDB } from './utils/editInDB';

export const editPost = [
  verifyToken('accessToken'),
  upload.single('postImg'),
  ...editPostValidaiton,
  async (req: GetUserAuthInfoRequest, res: Response) => {
    if (errors(req).length > 0) return res.status(400).json({ errors: errors(req) });
    const { title, body, tags } = req.body;

    const { id } = req.params;

    const editData = {
      ...(body != null && { body }),
      ...(title != null && { title }),
      ...(tags != null && { tags: JSON.parse(tags) }),
    };

    if (id !== req.user?.userId || req.user?.role !== 'ADMIN') return res.status(401).json({ errors: 'Unauthorized' });
    const imgData = req.file != null && (await uploadToCloudinary({ path: req.file.path, originalname: req.file.originalname }));

    const post = await editInDB(editData, imgData, id);

    res.json({ post });
  },
];
