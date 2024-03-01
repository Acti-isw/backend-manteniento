import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { HistorialStockService } from '../services/historial-stock.service';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(AuthenticationGuard, RolesGuard)
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
