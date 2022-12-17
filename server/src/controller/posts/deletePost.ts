import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
import { GetUserAuthInfoRequest } from '../../utils/request';
import { verifyToken } from '../../utils/token';
const prisma = new PrismaClient();
export const deletePost = [
  // Validate the request
  verifyToken('accessToken'),
  async (req: GetUserAuthInfoRequest, res: Response) => {
    const { id } = req.params;

    if (id !== req.user?.userId || req.user?.role !== 'ADMIN') return res.status(401).json({ errors: 'Unauthorized' });
    // Delete the post
    try {
      await prisma.post.delete({
        where: {
          id,
        },
      });
      res.json({ message: 'Post deleted' });
    } catch (err: any) {
      res.status(400).json({ errors: err.message });
    }
  },
];
