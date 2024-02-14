import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDTO } from '../dto/user.dto';
import { TransformDataInterceptor } from 'src/interceptors/transform-data.interceptor';
import { UserResponseDTO } from '../dto/userResponse.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(new TransformDataInterceptor(UserResponseDTO))
  @Post('register')
  @ApiBody({ type: [UserDTO] })
  async createUser(@Body() data: UserDTO) {
    return await this.usersService.createUser(data);
  }

  @UseInterceptors(new TransformDataInterceptor(UserResponseDTO))
  @Get('all')
  async findAllUsers() {
    return await this.usersService.findUsers();
  }

  @Get(':id')
  @UseInterceptors(new TransformDataInterceptor(UserResponseDTO))
  async findUserById(@Param('id') id: number) {
    return await this.usersService.findUserById(id);
  }

  @Delete('delete:id')
  async deleteUser(@Param('id') id: number) {
    return await this.usersService.deleteUser(id);
  }
}
