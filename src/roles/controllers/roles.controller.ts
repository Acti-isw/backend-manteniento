import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from '../services/roles.service';
import { RoleDTO, RoleUpdateDTO } from '../dto/roles.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('roles')
@ApiTags('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  async createCategory(@Body() categoria: RoleDTO) {
    return this.roleService.createRole(categoria);
  }

  @Put('update')
  async updateRole(@Body() categoria: RoleUpdateDTO) {
    return this.roleService.updateRole(categoria);
  }

  @Get('all')
  async findCategories() {
    return this.roleService.findRole();
  }

  @Get(':id')
  async findRoleById(@Param('id') id: number) {
    return this.roleService.findRoleById(id);
  }

  @Delete(':id')
  async deleteRoleById(@Param('id') id: number) {
    return this.roleService.deleteRole(id);
  }
}
