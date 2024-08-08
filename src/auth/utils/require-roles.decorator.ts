/* eslint-disable prettier/prettier */
import { SetMetadata, applyDecorators } from '@nestjs/common';
import { UserRole } from 'src/common/enums/user-role.enum';

// has roles decorator (to check if user has the required role)
export const RequireRoles = (...roles: UserRole[]) => {
    return applyDecorators(SetMetadata('roles', roles));
};
