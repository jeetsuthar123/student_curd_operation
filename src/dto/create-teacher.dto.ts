/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
export class CreateTeacherDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;
    @IsNumber()
    @IsNotEmpty()
    readonly mobileNumber: number;
    
   
    @IsNotEmpty()
    readonly classes: number[];
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly gender: string;
}