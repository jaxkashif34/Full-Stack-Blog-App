import { Response } from 'express';
import { upload } from '../../middleware';
import { errors } from '../../utils/errors';
import { GetUserAuthInfoRequest } from '../../utils/request';
import { verifyToken } from '../../utils/token';
import { createPostValidaiotn } from '../../utils/validation/posts/createPost';
import { PrismaClient } from '@prisma/client';
import { uploadToCloudinary } from '../../config/cloudniary-config';
import { saveInDB } from './utils/saveInDB';
const prisma = new PrismaClient();

export const createPost = [
  verifyToken('accessToken'),
  upload.single('postImg'),
  ...createPostValidaiotn,
  async (req: GetUserAuthInfoRequest, res: Response) => {
    const { title, body, tags } = req.body;

    if (errors(req).length > 0) return res.status(400).json({ errors: errors(req) });

    if (!req.file) return res.status(400).json({ errors: 'Please upload a post picture' });

    const { originalname, path } = req.file;

    const postData = {
      title,
      body,
      tags: JSON.parse(tags),
    };

    const imgData = await uploadToCloudinary({ path, originalname });

    const post = await saveInDB(postData, imgData, req.user?.userId);

    res.json({ post });
  },
];
