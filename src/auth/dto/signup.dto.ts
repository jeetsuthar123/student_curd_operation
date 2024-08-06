/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsEmail({}, { message: 'please enter correct email' })
  readonly email: string;
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  readonly password: string;
}
