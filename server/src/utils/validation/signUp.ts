import { body } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { FIELDS } from './fields';
const prisma = new PrismaClient();
export const sigUpValidation = [
  // name validation
  body(FIELDS.name)
    .exists()
    .withMessage('name field is missing')
    .escape()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('name must be between 3 and 20 characters')
    .matches('^[a-zA-Z ]{2,30}$')
    // This regular expression will match any string that contains only letters and spaces and is at least two and at most 30 characters long. It will not match strings that contain numbers, punctuation, or special characters, or strings that are fewer than two or more than 30 characters long.
    .withMessage('name must be only letters'),
  // email validation
  body(FIELDS.email)
    .exists()
    .withMessage('email field is missing')
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
            email,
          },
        });

        if (user?.email === email) {
          return Promise.reject('email already exists');
        }
      } catch (error: any) {
        return Promise.reject(error);
      }
    }),
  // password validation
  body(FIELDS.password).exists().withMessage('password field is missing').escape().trim().isLength({ min: 6, max: 20 }).withMessage('password must be between 6 and 20 characters'),
  // confirmPassword validation
  body(FIELDS.confirmPassword)
    .exists()
    .withMessage('confirmPassword field is missing')
    .escape()
    .trim()
    .custom((value, { req }) => value === req.body.password)
    .withMessage('password does not match'),
  // user role validation
  body(FIELDS.role).escape().trim().optional().isIn(['AUTHER', 'ADMIN']).withMessage('role must be either AUTHER or ADMIN'),
  body(FIELDS.DOB)
    .escape()
    .trim()
    .exists()
    .withMessage('date of birth is required')
    // regular expression for matching this format YYYY-MM-DD
    .matches('^(19[5-9][0-9]|20[0-9][0-9])-([1-9]|0[1-9]|1[012])-([1-9]|0[1-9]|[12][0-9]|3[01])$')
    .withMessage(`Please enter a valid date of birth in the format 'YYYY-MM-DD'`),
  body(FIELDS.emailUpdates).escape().trim().isBoolean().withMessage('Must be a boolean true or false'),
];
