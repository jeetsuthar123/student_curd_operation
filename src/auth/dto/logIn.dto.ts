/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
export class LogInDto {

  
  @IsString()
  @IsEmail({}, { message: 'please enter correct email' })
  @IsNotEmpty()
  readonly email: string;
  
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  readonly password: string;
}
