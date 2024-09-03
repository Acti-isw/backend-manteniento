import { Module } from '@nestjs/common';
import { EmpleadosService } from './services/empleados.service';
import { EmpleadosController } from './controllers/empleados.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [EmpleadosService],
  controllers: [EmpleadosController],
  imports: [PrismaModule],
})
export class EmpleadosModule {}
