import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TPayload } from '../entities/auth/types';

export const GetCurrentUserId = createParamDecorator(
  (_, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as TPayload;

    return user.sub;
  },
);
