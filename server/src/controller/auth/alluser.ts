import { Response } from 'express';
import { GetUserAuthInfoRequest } from '../../utils/request';
import { verifyToken } from '../../utils/token';
import { PrismaClient } from '@prisma/client';
import { SELECT_FIELDS } from './utils/fields';
const prisma = new PrismaClient();
export const allUsers = [
  verifyToken('accessToken'),
  async (req: GetUserAuthInfoRequest, res: Response) => {
    try {
      const users = await prisma.user.findMany({
        select: SELECT_FIELDS,
      });
      res.json({ users });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
];
