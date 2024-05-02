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
import { InventarioService } from '../services/inventario.service';
import {
  InventarioDTO,
  InventarioHistoryStockUpdateDTO,
  InventarioUpdateDTO,
} from '../dto/inventario.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { HistorialStockService } from 'src/historial-stock/services/historial-stock.service';
import { HistorialStockDTO } from 'src/historial-stock/dto/historialStock.dto';
import { plainToClass } from 'class-transformer';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('inventarios')
@ApiTags('inventarios')
export class InventarioController {
  constructor(
    private readonly inventarioServices: InventarioService,
    private readonly historialStockServices: HistorialStockService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post('create')
  async createInventory(@Body() data: InventarioDTO) {
    return this.inventarioServices.createInventory(data);
  }

  @Put('update')
  async upadateInventory(@Body() data: InventarioUpdateDTO) {
    return await this.inventarioServices.updateInventory(data); //Actualizacion
  }

  @Put('ajuste')
  async updateInventoryHistoryStock(
    @Body() data: InventarioHistoryStockUpdateDTO,
  ) {
    const inventoryOld = await this.inventarioServices.findInventoryById(
      data.idInventario,
    ); //Para obtener el stockActual Antiguo

    const acciones = await this.prismaService.accionesStock.findMany();
    console.log(acciones);

    const inventory = await this.inventarioServices.updateInventory(data); //Actualizacion
    const dataHistory = {
      stockAnterior: inventoryOld.stockActual,
      stockNuevo: inventory.stockActual,
      idItem: inventory.idItem,
      idAccion: acciones.find((accion) => accion.nombre == 'STOCK AJUSTE')
        .idAccion,
      motivo: data.motivo,
      idEmpleado: data.idEmpleado,
      idUsuario: inventory.idUsuario,
      fecha: new Date(),
    };
    const historyDto = plainToClass(HistorialStockDTO, dataHistory);

    const history =
      await this.historialStockServices.createStockHistory(historyDto);

    return {
      ...inventory,
      ...history,
    };
  }

  @Get('all')
  async findInventories() {
    return this.inventarioServices.findInventories();
  }

  @Get('count')
  async countInventories() {
    return this.inventarioServices.countInventories();
  }

  @Get(':id')
  async findInventoryById(@Param('id') id: number) {
    return this.inventarioServices.findInventoryById(id);
  }

  @Delete(':id')
  async deleteInventoryById(@Param('id') id: number) {
    return this.inventarioServices.deleteInventory(id);
  }
}
