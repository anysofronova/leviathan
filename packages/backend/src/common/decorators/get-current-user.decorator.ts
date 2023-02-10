import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { TPayloadWithRt } from '../../auth/types';

export const GetCurrentUser = createParamDecorator(
  (data: keyof TPayloadWithRt | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;

    return request.user[data];
  },
);
