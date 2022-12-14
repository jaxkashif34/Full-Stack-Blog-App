import { PrismaClient } from '@prisma/client';
import { body } from 'express-validator';
import { FIELDS } from './fields';
const prisma = new PrismaClient();
import { comparePassword } from '../Encryption';
export const signInValidation = [
  body(FIELDS.email)
    .exists()
    .withMessage('Email is required')
    .escape()
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage('email must be a valid email address')
    .custom(async (email) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (user == null) return Promise.reject('No user with that email');
      } catch (err: any) {
        return Promise.reject(err.message);
      }
    }),
  body(FIELDS.password, 'password is required')
    .exists()
    .withMessage('password is required')
    .escape()
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage('password must be between 6 and 20 characters')
    .custom(async (value, { req }) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: req.body.email,
          },
        });
        if (user != null) {
          if (!(await comparePassword(value, user.password))) return Promise.reject('wrong password');
        }
      } catch (err: any) {
        return Promise.reject(err.message);
      }
    }),
];
