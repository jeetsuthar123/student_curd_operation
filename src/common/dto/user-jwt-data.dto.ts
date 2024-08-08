/* eslint-disable prettier/prettier */
import { Types } from 'mongoose';
import { UserRole } from '../enums/user-role.enum';

export interface JwtUserObject {
    id: string;
    roles: UserRole[];
    email: string;
    _id: Types.ObjectId;
    storeId: string;
}
