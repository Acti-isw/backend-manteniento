import { Module } from '@nestjs/common';
import { UbicacionGolpeService } from './services/ubicacion-golpe.service';
import { UbicacionGolpeController } from './controllers/ubicacion-golpe.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [UbicacionGolpeService],
  controllers: [UbicacionGolpeController],
  imports: [PrismaModule],
  exports: [UbicacionGolpeService],
})
export class UbicacionGolpeModule {}
