import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { GetUserAuthInfoRequest } from './request';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
interface User {
  id: string;
  name: string;
  role: string;
  emailUpdates: boolean;
}
const accessTokenName: string = 'accessToken';
const refreshTokenName: string = 'refreshToken';

const generateToken = (user: User, time: string) => {
  return jwt.sign({ id: user.id, name: user.name, role: user.role }, process.env.JWT_ACCESS_SECRET!, { expiresIn: time });
};

const generateCookie = (res: Response, token: string, tokenName: string) => {
  res.cookie(tokenName, token, {
    httpOnly: true,
    sameSite: 'none',
    ...(process.env.NODE_ENV === 'production' && { secure: true }),
  });
};
export const setToken = async (res: Response, user: User) => {
  const exp: string = '15s';
  const accessToken = generateToken(user, '7s');
  const refreshToken = jwt.sign({ id: user.id, name: user.name, role: user.role }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: exp,
  });
  generateCookie(res, accessToken, accessTokenName);
  generateCookie(res, refreshToken, refreshTokenName);
  try {
    await prisma.token.create({ data: { token: refreshToken, exp, iat: Date.now().toString() } });
  } catch (err: any) {
    res.status(500).json({ message: 'unable to store refresh token', error: err.message });
  }
};

export const varifyToken = (tokenName: string) => {
  return (req: GetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const token = req.cookies[tokenName];
    const tokenSecret = tokenName === 'accessToken' ? process.env.JWT_ACCESS_SECRET! : process.env.JWT_REFRESH_SECRET!;
    if (token == null) return res.status(400).json({ errors: 'missing token' });
    jwt.verify(token, tokenSecret, (err: any, userData: any) => {
      if (err) return res.status(400).json({ errors: err.message });
      req.user = userData;
      next();
    });
  };
};

export const clearCookies = (res: Response) => {
  res.clearCookie(accessTokenName);
  res.clearCookie(refreshTokenName);
};
