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
  return jwt.sign({ userId: user.id, name: user.name, role: user.role }, process.env.JWT_ACCESS_SECRET!, { expiresIn: time });
};

const generateCookie = (res: Response, token: string, tokenName: string) => {
  res.cookie(tokenName, token, {
    httpOnly: true,
    sameSite: 'none',
    ...(process.env.NODE_ENV === 'production' && { secure: true }),
  });
};
export const setToken = async (res: Response, user: User) => {
  const exp: string = (Date.now() + 1000 * 60 * 60 * 24 * 2).toString(); // 2 days
  const accessToken = generateToken(user, '1d');
  const refreshToken = jwt.sign({ userId: user.id, name: user.name, role: user.role }, process.env.JWT_REFRESH_SECRET!, {
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

export const verifyToken = (tokenName: string) => {
  return (req: GetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const token = req.cookies[tokenName];
    const tokenSecret = tokenName === 'accessToken' ? process.env.JWT_ACCESS_SECRET! : process.env.JWT_REFRESH_SECRET!;
    if (token == null) return res.status(400).json({ errors: "please sign in or you don't have token" });
    jwt.verify(token, tokenSecret, (err: any, userData: any) => {
      if (err) return res.status(400).json({ errors: err.message });
      if (tokenName !== 'refreshToken') {
        req.user = userData;
      }
      next();
    });
  };
};

export const clearCookies = (res: Response) => {
  res.clearCookie(accessTokenName);
  res.clearCookie(refreshTokenName);
};
