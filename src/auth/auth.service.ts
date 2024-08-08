/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';

import * as dotenv from 'dotenv';
import { LogInDto } from './dto/logIn.dto';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private userModal: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModal.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });
    console.log("token..........",token);

    return { token };
  }

  async logIn(logInDto: LogInDto): Promise<{ token: string }> {
    const { email, password } = logInDto;
    
    const user = await this.userModal.findOne({email});

    if(!user)
    {
      throw new UnauthorizedException('Invalid email and password')
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if(!isPasswordMatched)
      {
        throw new UnauthorizedException('Invalid email and password')
      }

    const token = this.jwtService.sign({ id: user._id });
  
    return { token };
  }

}
