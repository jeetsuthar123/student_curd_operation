/* eslint-disable prettier/prettier */
// @User() parameter decorator to get the user from the request object

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserObj = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.user;
    },
);
