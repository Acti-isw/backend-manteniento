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
import { SalidaEntradaStockService } from '../services/salida-entrada-stock.service';
import {
  SalidaEntStockDTO,
  SalidaEntStockUpdateDTO,
} from '../dto/dto/salidaEntStock.dto';

@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('salida-ent-inv')
@ApiTags('salida-ent-inv')
export class SalidaEntradaStockController {
  constructor(
    private readonly salidaEntStockServices: SalidaEntradaStockService,
  ) {}

  @Post('create')
  async createSalEntHer(@Body() registro: SalidaEntStockDTO) {
    return this.salidaEntStockServices.createSalEntStock(registro);
  }
  @Put('update')
  async updateSalEntHer(@Body() registro: SalidaEntStockUpdateDTO) {
    return this.salidaEntStockServices.UpdateSalEntStock(registro);
  }

  @Get('all')
  async findSalEntInventario() {
    return this.salidaEntStockServices.findManySalEntStock();
  }
  @Get('entradas')
  async findEntradasInventario() {
    return this.salidaEntStockServices.findEntradasStock();
  }
  @Get('salidas')
  async findSalEntHer() {
    return this.salidaEntStockServices.findSalidasStock();
  }
  @Get(':id')
  async findSalidaEntradaById(@Param('id') id: number) {
    return this.salidaEntStockServices.findSalEntStockById(id);
  }
  @Get('herramientas/:id')
  async findSalEntHerById(@Param('id') id: number) {
    return this.salidaEntStockServices.findSalEntStockById(id);
  }
  @Get('entradas/count')
  async countEntradasInventario() {
    return this.salidaEntStockServices.countEntradasInventario();
  }
  @Get('salidas/count')
  async countSalidasInventario() {
    return this.salidaEntStockServices.countSalidasInventario();
  }
}
