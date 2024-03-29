import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { RoleController } from './controllers/roles.controller';
import { RoleService } from './services/roles.service';

@Module({
  providers: [RoleService],
  controllers: [RoleController],
  imports: [PrismaModule],
})
export class RoleModule {}
