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
    return this.roleService.createCategory(categoria);
  }

  @Put('update')
  async updateCategory(@Body() categoria: RoleUpdateDTO) {
    return this.roleService.updateCategory(categoria);
  }

  @Get('all')
  async findCategories() {
    return this.roleService.findCategories();
  }

  @Get(':id')
  async findCategoryById(@Param('id') id: number) {
    return this.roleService.findCategoryById(id);
  }

  @Delete(':id')
  async deleteCategoryById(@Param('id') id: number) {
    return this.roleService.deleteCategory(id);
  }
}
