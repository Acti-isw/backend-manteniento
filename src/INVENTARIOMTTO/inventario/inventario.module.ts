import { Module } from '@nestjs/common';
import { InventarioService } from './services/inventario.service';
import { InventarioController } from './controllers/inventario.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HistorialStockModule } from '../historial-stock/historial-stock.module';


@Module({
  providers: [InventarioService],
  controllers: [InventarioController],
  imports: [PrismaModule, HistorialStockModule],
  exports: [InventarioService],
})
export class InventarioModule {}
