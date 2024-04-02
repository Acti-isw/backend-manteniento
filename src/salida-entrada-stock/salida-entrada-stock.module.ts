import { Module } from '@nestjs/common';
import { SalidaEntradaStockController } from './controllers/salida-entrada-stock.controller';
import { SalidaEntradaStockService } from './services/salida-entrada-stock.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SalidaEntradaItemService } from 'src/salida-entrada-item/services/salida-entrada-item.service';

@Module({
  providers: [SalidaEntradaStockService, SalidaEntradaItemService],
  controllers: [SalidaEntradaStockController],

  imports: [PrismaModule, SalidaEntradaStockModule],
})
export class SalidaEntradaStockModule {}
