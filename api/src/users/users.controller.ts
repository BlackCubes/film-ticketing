import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage } from 'src/response-message.decorator';
import { Action } from 'src/ability/enums/action.enum';
import { CheckAbilities } from 'src/ability/decorators/check-abilities.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @CheckAbilities({ action: Action.Read, subject: User })
  @ResponseMessage('Success!')
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @CheckAbilities({ action: Action.Read, subject: User })
  @ResponseMessage('Success!')
  async findOne(@Param('id') id: string) {
    const foundOne = await this.usersService.findOne(id, 'id');

    return foundOne;
  }

  @Post('')
  @CheckAbilities({ action: Action.Create, subject: User })
  @ResponseMessage('Success!')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.usersService.createUser(createUserDto);

    return `Successfully registered ${createdUser.email}!`;
  }

  @Patch(':id')
  @CheckAbilities({ action: Action.Update, subject: User })
  @ResponseMessage('Success!')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @CheckAbilities({ action: Action.Delete, subject: User })
  @ResponseMessage('Success!')
  async remove(@Param('id') id: string) {
    const removed = await this.usersService.remove(id);

    return `${removed.name}'s has been deleted.`;
  }
}
