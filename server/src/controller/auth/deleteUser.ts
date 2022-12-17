import { Response } from 'express';
import { GetUserAuthInfoRequest } from '../../utils/request';
import { clearCookies, verifyToken } from '../../utils/token';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const deleteUser = [
  verifyToken('accessToken'),
  async (req: GetUserAuthInfoRequest, res: Response) => {
    const { id } = req.params;
    try {
      if (id !== req.user?.userId || req.user?.role !== 'ADMIN') return res.status(401).json({ error: 'You are not authorized to delete this user' });
      await prisma.user.delete({
        where: {
          id,
        },
      });
      clearCookies(res);
      res.json({ message: 'User Deleted Successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
];
