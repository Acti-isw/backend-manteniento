import { Module } from '@nestjs/common';
import { CategoriaService } from './services/categoria.service';
import { CategoriaController } from './controllers/categoria.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [CategoriaService, PrismaService],
  controllers: [CategoriaController]
})
export class CategoriaModule {}
