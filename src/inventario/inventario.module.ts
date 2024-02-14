import { Module } from '@nestjs/common';
import { InventarioService } from './services/inventario.service';
import { InventarioController } from './controllers/inventario.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [InventarioService, PrismaService],
  controllers: [InventarioController],
  exports:[InventarioService]
})
export class InventarioModule {}
