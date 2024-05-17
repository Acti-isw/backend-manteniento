import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoriaModule } from './categoria/categoria.module';
import { UnidadesModule } from './unidades/unidades.module';
import { HerramientasModule } from './herramientas/herramientas.module';
import { ItemModule } from './item/item.module';
import { InventarioModule } from './inventario/inventario.module';
import { SalidaEntradaHerramientasModule } from './salida-entrada-herramientas/salida-entrada-herramientas.module';
import { HistorialStockModule } from './historial-stock/historial-stock.module';
import { SeedModule } from './seed/seed.module';
import { RoleModule } from './roles/roles.module';
import { SalidaEntradaItemModule } from './salida-entrada-item/salida-entrada-item.module';
import { SalidaEntradaStockModule } from './salida-entrada-stock/salida-entrada-stock.module';
import { PermisosModule } from './permisos/permisos.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: '.env',
    // }),
    PrismaModule,
    CategoriaModule,
    UnidadesModule,
    HerramientasModule,
    ItemModule,
    InventarioModule,
    SalidaEntradaHerramientasModule,
    HistorialStockModule,
    SeedModule,
    RoleModule,
    SalidaEntradaItemModule,
    SalidaEntradaStockModule,
    PermisosModule,
    InvetariomttoModule,
  ]
})
export class InvetariomttoModule {}
