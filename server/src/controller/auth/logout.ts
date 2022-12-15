import { Response } from 'express';
import { GetUserAuthInfoRequest } from '../../utils/request';
import { clearCookies, verifyToken } from '../../utils/token';

export const logoutUser = [
  verifyToken('accessToken'),
  async (req: GetUserAuthInfoRequest, res: Response) => {
    try {
      clearCookies(res);
      res.json({ message: 'User Logged Out Successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
];
