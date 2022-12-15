import { body } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { FIELDS } from './fields';
import { comparePassword } from '../Encryption';
const prisma = new PrismaClient();
export const editUserValidation = [
  // name validation
  body(FIELDS.name)
    .optional()
    .escape()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('name must be between 3 and 20 characters')
    .matches('^[a-zA-Z ]{2,30}$')
    // This regular expression will match any string that contains only letters and spaces and is at least two and at most 30 characters long. It will not match strings that contain numbers, punctuation, or special characters, or strings that are fewer than two or more than 30 characters long.
    .withMessage('name must be only letters'),
  // email validation
  body(FIELDS.email)
    .optional()
    .escape()
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage('email must be a valid email address')
    .custom(async (email, { req }) => {
      // check if email exists in db
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: req.body.email,
          },
        });

        if (user?.email === email || user != null) {
          return Promise.reject('you already have the same email or this email is already in use');
        }
      } catch (error: any) {
        return Promise.reject(error);
      }
    })
    .custom((email, { req }) => {
      const isEmpty = (field: string) => req.body[field] == null || req.body[field] === '';
      // in order to change the email we need to rquired password field
      if (email !== '' && isEmpty(FIELDS.oldPassword)) return Promise.reject('oldPassword is required to change the email address');
      return true;
    }),
  // password validation
  body(FIELDS.password)
    .optional()
    .escape()
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage('password must be between 6 and 20 characters')
    .custom((password, { req }) => {
      const isEmpty = (field: string) => req.body[field] == null || req.body[field] === '';
      if (password !== '' && isEmpty(FIELDS.oldPassword)) return Promise.reject('old password is required to change the password');
      if (password !== '' && isEmpty(FIELDS.confirmPassword)) return Promise.reject('confirmPassword is required to change the password');
      return true;
    }),
  // confirmPassword validation
  body(FIELDS.confirmPassword)
    .optional()
    .escape()
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) return Promise.reject('confirmPassword must match the password field');
      return true;
    }),
  body(FIELDS.oldPassword)
    .trim()
    .escape()
    .optional()
    .isLength({ min: 6, max: 20 })
    .withMessage('oldPassword must be between 6 and 20 characters')
    .custom(async (password, { req }) => {
      try {
        if (password.length > 6) {
          const user = await prisma.user.findUnique({
            where: {
              id: req.params.id,
            },
          });
          if (user == null) return Promise.reject('user not found');
          if (!(await comparePassword(password, user.password))) return Promise.reject('oldPassword is incorrect');
        }

        return true;
      } catch (err: any) {
        return Promise.reject(err.message);
      }
    }),
  // user role validation
  body(FIELDS.role)
    .escape()
    .trim()
    .optional()
    .isIn(['AUTHER', 'ADMIN'])
    .withMessage('role must be either AUTHER or ADMIN')
    .custom(async (value, { req }) => {
      try {
        if (value === 'AUTHER' || value === 'ADMIN') {
          const user = await prisma.user.findUnique({
            where: {
              id: req.params.id,
            },
          });

          if (user == null) return Promise.reject('user not found');
          if (user.role !== 'ADMIN') return Promise.reject('You can not change your role to ADMIN');
        }
      } catch (err: any) {
        return Promise.reject(err.message);
      }

      return true;
    }),
  body(FIELDS.DOB)
    .escape()
    .trim()
    .optional()
    // regular expression for matching this format YYYY-MM-DD
    .matches('^(19[5-9][0-9]|20[0-9][0-9])-([1-9]|0[1-9]|1[012])-([1-9]|0[1-9]|[12][0-9]|3[01])$')
    .withMessage(`Please enter a valid date of birth in the format 'YYYY-MM-DD'`),
  body(FIELDS.emailUpdates).escape().trim().optional().isBoolean().withMessage('Must be a boolean true or false'),
];
