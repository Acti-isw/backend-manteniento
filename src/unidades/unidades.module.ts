import { Module } from '@nestjs/common';
import { UnidadesService } from './services/unidades.service';
import { UnidadesController } from './controllers/unidades.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [UnidadesService, PrismaService],
  controllers: [UnidadesController]
})
export class UnidadesModule {}
