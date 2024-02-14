import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriaModule } from './categoria/categoria.module';
import { UnidadesModule } from './unidades/unidades.module';
import { HerramientasModule } from './herramientas/herramientas.module';
import { ItemModule } from './item/item.module';
import { InventarioModule } from './inventario/inventario.module';


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

  ],
})
export class AppModule {}
