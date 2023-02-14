import { TUser } from './TUser';

export type TUserResponse = Omit<TUser, 'password'>;
