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

@Module({
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
  ],
})
export class AppModule {}
