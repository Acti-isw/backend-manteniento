import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriaModule } from './categoria/categoria.module';
import { UnidadesModule } from './unidades/unidades.module';
import { HerramientasModule } from './herramientas/herramientas.module';
import { InventarioModule } from './inventario/inventario.module';
import { ItemModule } from './item/item.module';
import { SalidaEntradaHerramientasModule } from './salida-entrada-herramientas/salida-entrada-herramientas.module';
//import { APP_FILTER } from '@nestjs/core';
//import { PrismaClientExceptionFilter } from './prisma/prisma-client-exception.filter';
import { HistorialStockModule } from './historial-stock/historial-stock.module';

@Module({
  // providers: [
  //   {
  //     provide: APP_FILTER,
  //     useClass: PrismaClientExceptionFilter,
  //   },
  // ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    PrismaModule,
    AuthModule,
    CategoriaModule,
    UnidadesModule,
    HerramientasModule,
    ItemModule,
    InventarioModule,
    SalidaEntradaHerramientasModule,
    HistorialStockModule,
  ],
})
export class AppModule {}
