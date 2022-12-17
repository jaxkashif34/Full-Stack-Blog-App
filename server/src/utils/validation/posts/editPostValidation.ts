import { body, check } from 'express-validator';
import { POST_FIELDS } from '../../fields';

export const editPostValidaiton = [
  body(POST_FIELDS.title)
    .optional()
    .trim()
    // if the title field is provided than only check lenght of title field
    .if(body(POST_FIELDS.title).exists())
    .isLength({ min: 30, max: 100 })
    .withMessage('title length is must be less than 30 characters'),

  body(POST_FIELDS.body).optional().trim().isLength({ min: 30, max: 100000 }).withMessage('title length is must be less than 30 characters').notEmpty().withMessage("Title can't be empty"),
  check(POST_FIELDS.tags).optional().toArray().isArray({ min: 1, max: 10 }).withMessage('at least one tag is required'),
];
