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
import { UnidadesService } from '../services/unidades.service';
import { UnidadesDTO, UnidadesUpdateDTO } from '../dto/unidades.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('unidades')
@ApiTags('unidades')
export class UnidadesController {
  constructor(private readonly unidadesService: UnidadesService) {}

  @Post('create')
  async createUnit(@Body() unidad: UnidadesDTO) {
    return this.unidadesService.createUnit(unidad);
  }

  @Put('update')
  async updateUnit(@Body() categoria: UnidadesUpdateDTO) {
    return this.unidadesService.updateUnit(categoria);
  }

  @Get('all')
  async findUnits() {
    return this.unidadesService.findUnits();
  }

  @Get('count')
  async countUnits() {
    return this.unidadesService.countUnits();
  }

  @Get(':id')
  async findUnitById(@Param('id') id: number) {
    return this.unidadesService.findUnitById(id);
  }

  @Delete(':id')
  async deleteUnitById(@Param('id') id: number) {
    return this.unidadesService.deleteUnit(id);
  }
}
