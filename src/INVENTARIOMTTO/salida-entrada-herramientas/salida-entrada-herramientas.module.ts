import { Module } from '@nestjs/common';
import { SalidaEntHerService } from './services/salida-ent-her.service';
import { SalidaEntHerController } from './controllers/salida-ent-her.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [SalidaEntHerService],
  controllers: [SalidaEntHerController],
  imports: [PrismaModule],
})
export class SalidaEntradaHerramientasModule {}
