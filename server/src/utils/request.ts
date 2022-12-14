import { Request } from 'express';

export interface GetUserAuthInfoRequest extends Request {
  user?: {
    id: string;
    role: string;
    name: string;
    emailUpdates: boolean;
  };
}
