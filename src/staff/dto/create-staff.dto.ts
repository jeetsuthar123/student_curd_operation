/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
export class CreateStaffDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;
    @IsNumber()
    @IsNotEmpty()
    readonly staffNumber: number;
    @IsNumber()
    @IsNotEmpty()
    readonly mobNum: number;
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly gender: string;
}