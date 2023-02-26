import { Request } from 'express';

export interface RequestModel extends Request {
  fileValidationError: string;
  user: any;
}

export type JwtPayload = {
  sub: string;
  email: string;
  name: string;
  id: string;
};
