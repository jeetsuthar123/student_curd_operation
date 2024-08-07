/* eslint-disable prettier/prettier */
import { IsEmpty, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { User } from "src/auth/schema/user.schema";
export class CreateStudentDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;
    @IsNumber()
    @IsNotEmpty()
    readonly roleNumber: number;
    
    @IsNumber()
    @IsNotEmpty()
    readonly class: number;
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly gender: string;
    @IsNumber()
    @IsNotEmpty()
    readonly marks: number;
    
    @IsEmpty({message:"You can not pass user id"})
    readonly user: User
}