import { Module } from '@nestjs/common';
import { InventarioService } from './services/inventario.service';
import { InventarioController } from './controllers/inventario.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [InventarioService],
  controllers: [InventarioController],
  imports: [PrismaModule],
  exports: [InventarioService],
})
export class InventarioModule {}
