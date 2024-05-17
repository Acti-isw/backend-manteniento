import { Module } from '@nestjs/common';
import { RegistroSalidaLlegadaService } from './services/registro-salida-llegada.service';
import { RegistroSalidaLlegadaController } from './controllers/registro-salida-llegada.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RegistroLlegadaController } from './controllers/registro-llegada.controller';
import { RegistroLlegadaService } from './services/registro-llegada.service';
import { RegistroSalidaService } from './services/registro-salida.service';
import { RegistroSalidaController } from './controllers/registro-salida.controller';
import { CarroceriaModule } from '../carroceria/carroceria.module';
import { UbicacionGolpeModule } from '../ubicacion-golpe/ubicacion-golpe.module';
import { AccesoriosSalidaLlegadaModule } from '../accesorios-salida-llegada/accesorios-salida-llegada.module';

@Module({
  providers: [
    RegistroSalidaLlegadaService,
    RegistroLlegadaService,
    RegistroSalidaService,
  ],
  controllers: [
    RegistroSalidaLlegadaController,
    RegistroLlegadaController,
    RegistroSalidaController,
  ],
  imports: [PrismaModule,CarroceriaModule, UbicacionGolpeModule, AccesoriosSalidaLlegadaModule],
})
export class RegistroSalidaLlegadaModule {}
