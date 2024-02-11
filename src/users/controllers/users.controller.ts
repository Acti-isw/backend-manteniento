import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDTO } from '../dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async createUser(@Body() data: UserDTO) {
    return await this.usersService.createUser(data);
  }

  @Get('all')
  async findAllUsers() {
    return await this.usersService.findUsers();
  }

  @Get(':id')
  async findUserById(@Param('id') id: number) {
    return await this.usersService.findUserById(id);
  }

  @Delete('delete:id')
  async deleteUser(@Param('id') id: number) {
    return await this.usersService.deleteUser(id);
  }
}
