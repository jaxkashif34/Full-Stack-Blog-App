import { body } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { AUTH_FIELDS } from '../../fields';
const prisma = new PrismaClient();
export const sigUpValidation = [
  // name validation
  body(AUTH_FIELDS.name)
    .exists()
    .withMessage('name field is missing')
    .notEmpty()
    .withMessage("Name can't be empty")
    .escape()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('name must be between 3 and 20 characters')
    .matches('^[a-zA-Z ]{2,30}$')
    // This regular expression will match any string that contains only letters and spaces and is at least two and at most 30 characters long. It will not match strings that contain numbers, punctuation, or special characters, or strings that are fewer than two or more than 30 characters long.
    .withMessage('name must be only letters'),
  // email validation
  body(AUTH_FIELDS.email)
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
  body(AUTH_FIELDS.password)
    .exists()
    .withMessage('password field is missing')
    .notEmpty()
    .withMessage("password can't be empty")
    .escape()
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage('password must be between 6 and 20 characters'),
  // confirmPassword validation
  body(AUTH_FIELDS.confirmPassword)
    .exists()
    .withMessage('confirmPassword field is missing')
    .notEmpty()
    .withMessage("confirmPassword can't be empty")
    .escape()
    .trim()
    .custom((value, { req }) => {
      if (value !== '') return value === req.body.password;
      return true;
    })
    .withMessage('password does not match'),
  // user role validation
  body(AUTH_FIELDS.role).escape().trim().optional().isIn(['AUTHER', 'ADMIN']).withMessage('role must be either AUTHER or ADMIN'),
  body(AUTH_FIELDS.DOB)
    .escape()
    .trim()
    .exists()
    .notEmpty()
    .withMessage("date of birth can't be empty")
    .withMessage('date of birth is required')
    // regular expression for matching this format YYYY-MM-DD
    .matches('^(19[5-9][0-9]|20[0-9][0-9])-([1-9]|0[1-9]|1[012])-([1-9]|0[1-9]|[12][0-9]|3[01])$')
    .withMessage(`Please enter a valid date of birth in the format 'YYYY-MM-DD'`),
  body(AUTH_FIELDS.emailUpdates).escape().trim().isBoolean().withMessage('Must be a boolean true or false'),
];
