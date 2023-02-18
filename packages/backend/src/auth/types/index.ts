import { TUserResponse } from '../../users/types';

export type TPayload = {
  email: string;
  sub: number;
};

export type TToken = {
  access_token: string;
  refresh_token: string;
};

export type TPayloadWithRt = TPayload & { refreshToken: string };

export type SignInPayload = {
  type: 'Bearer' | string;
  expiresIn: number;
  user: TUserResponse;
} & TToken;

export type SignUpPayload = TToken & {
  id: number;
};
