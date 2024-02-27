import { Module } from '@nestjs/common';
import { HistorialStockController } from './controllers/historial-stock.controller';
import { HistorialStockService } from './services/historial-stock.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [HistorialStockController],
  providers: [HistorialStockService],
  imports: [PrismaModule],
})
export class HistorialStockModule {}
