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
import { PermisosService } from '../services/permisos.service';
import { PermisoDTO, PermisoUpdateDTO } from '../dto/permiso.dto';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('permisos')
@ApiTags('permisos')
export class PermisosController {
  constructor(private readonly permisosServices: PermisosService) {}

  @Post('create')
  async createPermission(@Body() permiso: PermisoDTO) {
    return this.permisosServices.createPermission(permiso);
  }

  @Put('update')
  async updatePermission(@Body() permiso: PermisoUpdateDTO) {
    return this.permisosServices.updatePermission(permiso);
  }

  @Get('all')
  async findPermissions() {
    return this.permisosServices.findPermissions();
  }

  @Get('count')
  async countPermissions() {
    return this.permisosServices.countPermissions();
  }

  @Get(':id')
  async findPermissionById(@Param('id') id: number) {
    return this.permisosServices.findPermissionById(id);
  }

  @Delete(':id')
  async deletePermissionById(@Param('id') id: number) {
    return this.permisosServices.deletePermission(id);
  }
}
