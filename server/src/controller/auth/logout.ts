import { Response } from 'express';
import { GetUserAuthInfoRequest } from '../../utils/request';
import { clearCookies, verifyToken } from '../../utils/token';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const logoutUser = [
  verifyToken('accessToken'),
  async (req: GetUserAuthInfoRequest, res: Response) => {
    const { id } = req.params;
    try {
      if (id !== req.user?.userId) return res.status(401).json({ message: 'Unauthorized' });
      clearCookies(res);
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.status(401).json({ errors: 'Unauthorized refreshToken missing' });
      await prisma.token.delete({
        where: {
          token: refreshToken,
        },
      });
      res.json({ message: 'User Logged Out Successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
];
