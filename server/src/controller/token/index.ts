import { Response } from 'express';
import { GetUserAuthInfoRequest } from '../../utils/request';
import { setToken, verifyToken } from '../../utils/token';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();
export const getNewToken = [
  verifyToken('refreshToken'),
  async (req: GetUserAuthInfoRequest, res: Response) => {
    const token = req.cookies.refreshToken;
    try {
      jwt.verify(token, process.env.JWT_REFRESH_SECRET!, async (err: any, user: any) => {
        if (err) return res.status(400).json({ errors: err.message });
        setToken(res, { id: user.id, name: user.name, role: user.role, emailUpdates: user.emailUpdates });
        res.json({ message: 'new token generated' });

        // delete old token
        await prisma.token.delete({ where: { token } });
      });
    } catch (err: any) {
      res.status(500).json({ message: 'unable to get token', error: err.message });
    }
  },
];
