import {
  Inject,
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable({ scope: Scope.REQUEST })
export class UsersService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(REQUEST) private request: Request,
  ) {}

  onApplicationBootstrap() {
    const admin = {
      access: 'admin',
      email: process.env.ADMIN_EMAIL,
      name: process.env.ADMIN_NAME,
      password: process.env.ADMIN_PASSWORD,
    };

    if (admin.email && admin.name && admin.password) {
      this.userModel
        .findOne({ email: process.env.ADMIN_EMAIL ?? '' })
        .then((user) => {
          if (!user) {
            this.userModel.create({ ...admin });
          }
        });
    }
  }

  async findAll(): Promise<User[]> {
    if (!['admin'].includes(this.request['user']['access'])) {
      throw new UnauthorizedException(
        'You must have admin rights to perform this action!',
      );
    }

    return await this.userModel.find();
  }

  async findOne(
    idOrEmail: string,
    by: 'id' | 'email',
    queryProjections?: string[] | null,
    isLoggingIn: boolean = false,
  ): Promise<User | null> {
    if (by === 'email') {
      const model = this.userModel.findOne({ email: idOrEmail });

      if (queryProjections) {
        queryProjections.forEach((projection) => {
          model.select(projection);
        });
      }

      const foundUser = await model;

      if (!foundUser) {
        throw new NotFoundException('Incorrect email!');
      }

      return foundUser;
    }

    if (!Types.ObjectId.isValid(idOrEmail)) {
      throw new UnauthorizedException('Invalid user ID!');
    }

    const model = this.userModel.findById(idOrEmail);

    if (queryProjections) {
      queryProjections.forEach((projection) => {
        model.select(projection);
      });
    }

    const foundUser = await model;

    if (!foundUser) {
      throw new NotFoundException('Could not find user!');
    }

    return foundUser;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const foundUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (foundUser) {
      throw new UnauthorizedException('Email already in use!');
    }

    const clonedDto: CreateUserDto = { ...createUserDto };

    return await this.userModel.create(clonedDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findOne(id, 'id');

    const clonedDto: UpdateUserDto = { ...updateUserDto };

    const model = this.userModel.findByIdAndUpdate(id, clonedDto, {
      new: true,
    });

    const updatedUser = await model;

    if (!updatedUser) {
      throw new UnauthorizedException(
        'Cannot find user to update, or failed to update.',
      );
    }

    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    await this.findOne(id, 'id');

    const removed = await this.userModel.findByIdAndDelete(id);

    return removed;
  }
}
