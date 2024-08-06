/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
export interface IStaff extends Document{
    readonly name: string;
    readonly staffNumber: number;
    readonly gender: string;
    readonly mobNum: number;
}