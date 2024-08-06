/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
export class LogInDto {

  @IsNumber()
  @IsEmail({}, { message: 'please enter correct email' })
  readonly email: string;
  
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  readonly password: string;
}
