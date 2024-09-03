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
import { EmpleadosService } from '../services/empleados.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { EmpleadosDTO, EmpleadosUpdateDTO } from '../dto/empleados.dto';

@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('empleados')
@ApiTags('empleados')
export class EmpleadosController {
  constructor(private readonly unidadesService: EmpleadosService) {}

  @Post('create')
  async createEmployee(@Body() unidad: EmpleadosDTO) {
    return this.unidadesService.createEmployee(unidad);
  }

  @Put('update')
  async updateEmployee(@Body() categoria: EmpleadosUpdateDTO) {
    return this.unidadesService.updateEmployee(categoria);
  }

  @Get('all')
  async findEmployees() {
    return this.unidadesService.findEmployee();
  }

  @Get('count')
  async countEmployees() {
    return this.unidadesService.countEmpleados();
  }

  @Get(':id')
  async findEmployeeById(@Param('id') id: number) {
    return this.unidadesService.findEmployeeById(id);
  }

  @Delete(':id')
  async deleteEmployeeById(@Param('id') id: number) {
    return this.unidadesService.deleteEmployee(id);
  }
}
