/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
export interface IClass extends Document{
    readonly name: string;
    readonly classStrength: number;
    readonly noOfBoys: number;
    readonly noOfGirls: number;
}