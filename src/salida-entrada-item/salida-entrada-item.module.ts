import { Module } from '@nestjs/common';
import { SalidaEntradaItemController } from './controllers/salida-entrada-item.controller';
import { SalidaEntradaItemService } from './services/salida-entrada-item.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SalidaEntradaItemController],
  providers: [SalidaEntradaItemService],
  imports: [PrismaModule],
})
export class SalidaEntradaItemModule {}
