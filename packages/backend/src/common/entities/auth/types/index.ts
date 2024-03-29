import { TUserResponse } from '../../users/types';

export type TPayload = {
  email: string;
  sub: number;
};

export type TToken = {
  access_token: string;
  refresh_token: string;
};

export type TRefresh = {
  userId: number;
  refreshToken: string;
};

export type TPayloadWithRt = TPayload & { refreshToken: string };

export type SignInPayload = {
  type: 'Bearer' | string;
  expiresIn: number;
  user: TUserResponse;
} & TToken;

export type SingUpPayload = { tokens: TToken; id: number };
