import { Module } from '@nestjs/common';
import { CategoriaService } from './services/categoria.service';
import { CategoriaController } from './controllers/categoria.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [CategoriaService],
  controllers: [CategoriaController],
  imports: [PrismaModule],
})
export class CategoriaModule {}
