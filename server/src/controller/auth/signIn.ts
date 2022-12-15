import { Response } from 'express';
import { errors } from '../../utils/errors';
import { GetUserAuthInfoRequest } from '../../utils/request';
import { setToken } from '../../utils/token';
import { PrismaClient } from '@prisma/client';
import { signInValidation } from '../../utils/validation/signIn';
const prisma = new PrismaClient();
export const signIn = [
  ...signInValidation,
  async (req: GetUserAuthInfoRequest, res: Response) => {
    if (errors(req).length > 0) return res.status(400).json({ errors: errors(req) });

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      });
      setToken(res, user);
      res.json({ ...user, password: undefined });
    } catch (err) {
      return res.status(500).json({ errors: [{ msg: err.message }] });
    }
  },
];
