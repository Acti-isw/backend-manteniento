import { Module } from '@nestjs/common';
import { HerramientasService } from './services/herramientas.service';
import { HerramientasController } from './controllers/herramientas.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [HerramientasService, PrismaService],
  controllers: [HerramientasController],
  exports:[HerramientasService]
})
export class HerramientasModule {}
