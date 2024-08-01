/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
export interface ITeacher extends Document{
    readonly name: string;
    readonly classes: number[];
    readonly gender: string;
    readonly mobileNumber: number;
}