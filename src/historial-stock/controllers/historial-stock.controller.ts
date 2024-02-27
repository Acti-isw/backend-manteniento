import { Controller, Get, Param } from '@nestjs/common';
import { HistorialStockService } from '../services/historial-stock.service';

@Controller('historial-stock')
export class HistorialStockController {
  constructor(private readonly historialStockService: HistorialStockService) {}

  @Get('all')
  async findStockHistories() {
    return await this.historialStockService.findStockHistories();
  }

  @Get(':id')
  async findStockHistoryById(@Param('id') id: number) {
    return await this.historialStockService.findStockHistoryById(id);
  }
}
