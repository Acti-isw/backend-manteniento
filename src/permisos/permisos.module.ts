import { Module } from '@nestjs/common';
import { PermisosService } from './services/permisos.service';
import { PermisosController } from './controllers/permisos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [PermisosService],
  controllers: [PermisosController],
  imports: [PrismaModule],
  exports: [PermisosService],
})
export class PermisosModule {}
