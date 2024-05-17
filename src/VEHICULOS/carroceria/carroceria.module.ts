import { Module } from '@nestjs/common';
import { CarroceriaService } from './services/carroceria.service';
import { CarroceriaController } from './controllers/carroceria.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [CarroceriaService],
  controllers: [CarroceriaController],
  imports: [PrismaModule],
  exports: [CarroceriaService],
})
export class CarroceriaModule {}
