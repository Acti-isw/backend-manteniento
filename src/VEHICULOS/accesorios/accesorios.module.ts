import { Module } from '@nestjs/common';
import { AccesoriosService } from './services/accesorios.service';
import { AccesoriosController } from './controllers/accesorios.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [AccesoriosService],
  controllers: [AccesoriosController],
  imports: [PrismaModule],
})
export class AccesoriosModule {}
