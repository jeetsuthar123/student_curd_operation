/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
export class CreateClassDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;
    @IsNumber()
    @IsNotEmpty()
    readonly classStrength: number;
    @IsNumber()
    @IsNotEmpty()
    readonly noOfBoys: number;
    @IsNumber()
    @IsNotEmpty()
    readonly noOfGirls: number; 
}