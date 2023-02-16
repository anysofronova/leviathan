import { Request } from 'express';
import { TUser } from '../../users/types';
export interface RequestModel extends Request {
  fileValidationError: string;
  user: TUser;
}
