import { TToken } from './TToken';
import { TUserResponse } from '../../users/types';

export type TResponse = {
  type: 'Bearer' | string;
  expiresIn: number;
  user: TUserResponse;
} & TToken;
