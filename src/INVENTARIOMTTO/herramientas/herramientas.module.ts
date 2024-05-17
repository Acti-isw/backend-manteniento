import { Module } from '@nestjs/common';
import { HerramientasService } from './services/herramientas.service';
import { HerramientasController } from './controllers/herramientas.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [HerramientasService],
  controllers: [HerramientasController],
  imports: [PrismaModule],
  exports: [HerramientasService],
})
export class HerramientasModule {}
