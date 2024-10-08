/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/logIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto : SignUpDto) : Promise <{token : string}>{
    return this.authService.signUp(signUpDto)
  }

  @Post('/login')
  logIn(@Body() logInDto : LogInDto) : Promise <{token : string}>{
    return this.authService.logIn(logInDto)
  }

}
