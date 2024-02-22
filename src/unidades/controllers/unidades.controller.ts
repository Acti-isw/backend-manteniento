import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UnidadesService } from '../services/unidades.service';
import { UnidadesDTO, UnidadesUpdateDTO } from '../dto/unidades.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('unidades')
@ApiTags('unidades')
export class UnidadesController {
  constructor(private readonly unidadesService: UnidadesService) {}

  @Post('create')
  async createCategory(@Body() unidad: UnidadesDTO) {
    return this.unidadesService.createUnit(unidad);
  }

  @Put('update')
  async updateCategory(@Body() categoria: UnidadesUpdateDTO) {
    return this.unidadesService.updateUnit(categoria);
  }

  @Get('all')
  async findCategories() {
    return this.unidadesService.findUnits();
  }

  @Get(':id')
  async findCategoryById(@Param('id') id: number) {
    return this.unidadesService.findUnitById(id);
  }

  @Delete(':id')
  async deleteUnitById(@Param('id') id: number) {
    return this.unidadesService.deleteUnit(id);
  }
}
