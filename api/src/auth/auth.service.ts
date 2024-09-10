import {
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-dto';
import { ILoginResponse } from './interfaces/auth.interface';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(REQUEST) private request: Request,
  ) {}

  async login(loginDto: LoginDto): Promise<ILoginResponse> {
    const loggedIn = await this.usersService.findOne(
      loginDto.email,
      'email',
      ['+password'],
      true,
    );

    if (!(await loggedIn.checkCorrectPassword(loginDto.password))) {
      throw new UnauthorizedException('Incorrect password!');
    }

    const token = await this.jwtService.signAsync({
      id: loggedIn['id'],
    });

    return {
      token,
    };
  }

  async profile(): Promise<User> {
    return await this.usersService.findOne(this.request['user']['id'], 'id');
  }
}
