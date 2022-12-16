import { Request } from 'express';

export interface GetUserAuthInfoRequest extends Request {
  user?: {
    userId: string;
    role: string;
    name: string;
    emailUpdates: boolean;
    iat: string;
    exp: string;
  };
}
