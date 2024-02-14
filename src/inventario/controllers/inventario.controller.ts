import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { InventarioService } from '../services/inventario.service';
import { InventarioDTO, InventarioUpdateDTO } from '../dto/inventario.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('inventarios')
@ApiTags('inventarios')
export class InventarioController {
  constructor(private readonly inventarioServices: InventarioService) {}

  @Post('create')
  async createInventory(@Body() data: InventarioDTO) {
    return this.inventarioServices.createInventory(data);
  }

  @Put('update')
  async upadateInventory(@Body() data: InventarioUpdateDTO) {
    return this.inventarioServices.updateInventory(data);
  }

  @Get('all')
  async findInventories() {
    return this.inventarioServices.findInventories();
  }

  @Get(':id')
  async findInventoryById(@Param('id') id: number) {
    return this.inventarioServices.findInventoryById(id);
  }
}
