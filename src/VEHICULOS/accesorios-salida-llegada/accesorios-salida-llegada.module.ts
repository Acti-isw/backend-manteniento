import { Module } from '@nestjs/common';
import { AccesoriosSalidaLlegadaService } from './services/accesorios-salida-llegada.service';
import { AccesoriosSalidaLlegadaController } from './controllers/accesorios-salida-llegada.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [AccesoriosSalidaLlegadaService],
  controllers: [AccesoriosSalidaLlegadaController],
  imports: [PrismaModule],
  exports: [AccesoriosSalidaLlegadaService]
})
export class AccesoriosSalidaLlegadaModule {}
