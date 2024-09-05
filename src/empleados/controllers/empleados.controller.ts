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
  constructor(private readonly empleadosService: EmpleadosService) {}

  @Post('create')
  async createEmployee(@Body() empleado: EmpleadosDTO) {
    console.log(empleado);

    return this.empleadosService.createEmployee(empleado);
  }

  @Put('update')
  async updateEmployee(@Body() categoria: EmpleadosUpdateDTO) {
    return this.empleadosService.updateEmployee(categoria);
  }

  @Get('all')
  async findEmployees() {
    return this.empleadosService.findEmployee();
  }

  @Get('count')
  async countEmployees() {
    return this.empleadosService.countEmpleados();
  }

  @Get(':id')
  async findEmployeeById(@Param('id') id: number) {
    return this.empleadosService.findEmployeeById(id);
  }

  @Delete(':id')
  async deleteEmployeeById(@Param('id') id: number) {
    return this.empleadosService.deleteEmployee(id);
  }
}
