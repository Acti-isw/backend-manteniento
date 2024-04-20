import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { RoleController } from './controllers/roles.controller';
import { RoleService } from './services/roles.service';
import { PermisosModule } from 'src/permisos/permisos.module';
import { RolePermisoService } from './services/rolesPermisos.service';

@Module({
  providers: [RoleService, RolePermisoService],
  controllers: [RoleController],
  imports: [PrismaModule, PermisosModule],
})
export class RoleModule {}
