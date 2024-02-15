import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { HerramientasService } from '../services/herramientas.service';
import {
  HerramientasDTO,
  HerramientasUpdateDTO,
} from '../dto/herramientas.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('herramientas')
@ApiTags('herramientas')
export class HerramientasController {
  constructor(private readonly herramientasService: HerramientasService) {}

  @Post('create')
  async createTool(@Body() data: HerramientasDTO) {
    return this.herramientasService.createTool(data);
  }

  @Put('update')
  async updateTool(@Body() data: HerramientasUpdateDTO) {
    return this.herramientasService.updateTool(data);
  }

  @Get('all')
  async findTools() {
    return this.herramientasService.findTools();
  }

  @Get(':id')
  async findToolById(@Param('id') id: number) {
    return this.herramientasService.findToolById(id);
  }
}
