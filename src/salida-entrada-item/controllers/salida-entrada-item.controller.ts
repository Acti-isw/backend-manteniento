import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { SalidaEntradaItemService } from '../services/salida-entrada-item.service';
import {
  SalidaEntItemDTO,
  SalidaEntItemUpdateDTO,
} from '../dto/dto/salidaEntItem.dto';

@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('salida-ent-inv')
@ApiTags('salida-ent-inv')
export class SalidaEntradaItemController {
  constructor(
    private readonly salidaEntItemServices: SalidaEntradaItemService,
  ) {}

  @Post('create')
  async createSalEntHer(@Body() registro: SalidaEntItemDTO) {
    return this.salidaEntItemServices.createSalEntItem(registro);
  }

  @Put('update')
  async updateSalEntHer(@Body() registro: SalidaEntItemUpdateDTO) {
    return this.salidaEntItemServices.updateSalEntItem(registro);
  }

  @Get('all')
  async findSalEntInventario() {
    return this.salidaEntItemServices.findSalEntItem();
  }

  @Get('entradas')
  async findEntradasInventario() {
    return this.salidaEntItemServices.findEntradasInventario();
  }

  @Get('salidas')
  async findSalidasInventario() {
    return this.salidaEntItemServices.findSalidasInventario();
  }

  @Get('entradas/count')
  async countEntradasInventario() {
    return this.salidaEntItemServices.countEntradasInventario();
  }
  @Get('salidas/count')
  async countSalidasInventario() {
    return this.salidaEntItemServices.countSalidasInventario();
  }

  @Get(':id')
  async findSalEntHerById(@Param('id') id: number) {
    return this.salidaEntItemServices.findSalEntItemById(id);
  }
}
