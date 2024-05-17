import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UbicacionGolpeModule } from './ubicacion-golpe/ubicacion-golpe.module';
import { ReporteGeneralModule } from './reporte-general/reporte-general.module';
import { CarroceriaModule } from './carroceria/carroceria.module';
import { AccesoriosModule } from './accesorios/accesorios.module';
import { AccesoriosSalidaLlegadaModule } from './accesorios-salida-llegada/accesorios-salida-llegada.module';
import { RegistroSalidaLlegadaModule } from './registro-salida-llegada/registro-salida-llegada.module';

@Module({
  imports: [
    PrismaModule,
    UbicacionGolpeModule,
    ReporteGeneralModule,
    CarroceriaModule,
    AccesoriosModule,
    AccesoriosSalidaLlegadaModule,
    RegistroSalidaLlegadaModule,
  ],
})
export class VehiculosModule {}
