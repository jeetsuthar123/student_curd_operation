/* eslint-disable prettier/prettier */
// roles guard to allow access to routes based on user role
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../common/enums/user-role.enum';

// Role based protection for routes
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        // get roles from decorator
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
            'roles',
            [context.getHandler(), context.getClass()],
        );
        // if no roles are required, allow access
        if (!requiredRoles) {
            return true;
        }
        // get user from request object
        const { user } = context.switchToHttp().getRequest();

        // check if user has required role
        return requiredRoles.some((role) => user?.roles?.includes(role));
    }
}
