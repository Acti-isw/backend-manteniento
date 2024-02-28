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
import { HerramientasService } from '../services/herramientas.service';
import {
  HerramientasDTO,
  HerramientasUpdateDTO,
} from '../dto/herramientas.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';

@UseGuards(AuthenticationGuard)
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

  @Delete(':id')
  async deleteToolById(@Param('id') id: number) {
    return this.herramientasService.deleteTool(id);
  }
}
