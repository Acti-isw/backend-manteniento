import { Module } from '@nestjs/common';
import { ReporteGeneralService } from './services/reporte-general.service';
import { ReporteGeneralController } from './controllers/reporte-general.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ReporteGeneralService],
  controllers: [ReporteGeneralController],
  imports: [PrismaModule],
})
export class ReporteGeneralModule {}
