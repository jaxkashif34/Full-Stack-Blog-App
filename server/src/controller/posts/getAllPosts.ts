import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
import { GetUserAuthInfoRequest } from '../../utils/request';
import { verifyToken } from '../../utils/token';
const prisma = new PrismaClient();
export const getAllPosts = [
  verifyToken('accessToken'),
  async (req: GetUserAuthInfoRequest, res: Response) => {
    const user = req.user;

    try {
      if (user.role === 'ADMIN') {
        const posts = await prisma.post.findMany();
        res.json({ posts });
      } else {
        // show unauthorized error
        res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
];
