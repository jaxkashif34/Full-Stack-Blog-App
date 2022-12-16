import { body, check } from 'express-validator';
import { POST_FIELDS } from '../../fields';

export const createPostValidaiotn = [
  body(POST_FIELDS.title)
    .exists()
    .withMessage('title is required')
    .escape()
    .trim()
    // if the title field is provided than only check lenght of title field
    .if(body(POST_FIELDS.title).exists())
    .isLength({ min: 30, max: 100 })
    .withMessage('title length is must be less than 30 characters'),

  body(POST_FIELDS.body)
    .exists()
    .withMessage('title is required')
    .escape()
    .trim()
    .isLength({ min: 30, max: 100000 })
    .withMessage('title length is must be less than 30 characters')
    .notEmpty()
    .withMessage("Title can't be empty"),
  check(POST_FIELDS.tags).custom((value) => {
    if (value != null) {
      const tags = JSON.parse(value);
      if (tags.length < 1 || tags.lenght > 10) Promise.reject('at least one tag is required');
      return true;
    }
  }),
];
