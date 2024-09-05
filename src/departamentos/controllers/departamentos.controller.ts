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
import { DepartamentosService } from '../services/departamentos.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Departamentos } from '@prisma/client';
import { DepartamentosUpdateDTO } from '../dto/departamentos.dto';

@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('departamentos')
@ApiTags('departamentos')
export class DepartamentosController {
  constructor(private readonly unidadesService: DepartamentosService) {}

  @Post('create')
  async createDepartamento(@Body() departamento: Departamentos) {
    return this.unidadesService.createDepartamento(departamento);
  }

  @Put('update')
  async updateDepartamento(@Body() departamento: DepartamentosUpdateDTO) {
    return this.unidadesService.updateDepartamento(departamento);
  }

  @Get('all')
  async findDepartamentos() {
    return this.unidadesService.findDepartamento();
  }

  @Get('count')
  async countDepartamentos() {
    return this.unidadesService.countDepartamentos();
  }

  @Get(':id')
  async findDepartamentoById(@Param('id') id: number) {
    return this.unidadesService.findDepartamentoById(id);
  }

  @Delete(':id')
  async deleteDepartamentoById(@Param('id') id: number) {
    return this.unidadesService.deleteDepartamento(id);
  }
}
