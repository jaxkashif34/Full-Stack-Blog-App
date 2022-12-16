import { Response } from 'express';
import { GetUserAuthInfoRequest } from '../../utils/request';
import { verifyToken } from '../../utils/token';
import { PrismaClient } from '@prisma/client';
import { SELECT_FIELDS } from './utils/fields';
const prisma = new PrismaClient();
export const getSingleUser = [
  verifyToken('accessToken'),
  async (req: GetUserAuthInfoRequest, res: Response) => {
    const { id } = req.params;
    try {
      if (id === req.user?.userId || req.user?.role === 'ADMIN') {
        const user = await prisma.user.findUnique({
          where: {
            id,
          },
          select: SELECT_FIELDS,
        });
        res.json(user);
      } else {
        res.status(401).json({ error: 'You are not authorized to get this user' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
];
