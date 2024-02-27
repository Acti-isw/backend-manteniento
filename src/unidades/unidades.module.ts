import { Module } from '@nestjs/common';
import { UnidadesService } from './services/unidades.service';
import { UnidadesController } from './controllers/unidades.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [UnidadesService],
  controllers: [UnidadesController],
  imports: [PrismaModule],
})
export class UnidadesModule {}
