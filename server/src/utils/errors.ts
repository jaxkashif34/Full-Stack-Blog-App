import { validationResult } from 'express-validator';
import { Request } from 'express';
export const errors = (req: Request) => {
  return validationResult(req)
    .array()
    .map((err) => err.msg);
};
