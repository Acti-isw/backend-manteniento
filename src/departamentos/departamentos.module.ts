import { Module } from '@nestjs/common';
import { DepartamentosService } from './services/departamentos.service';
import { DepartamentosController } from './controllers/departamentos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [DepartamentosService],
  controllers: [DepartamentosController],
  imports: [PrismaModule],
})
export class DepartamentosModule {}
