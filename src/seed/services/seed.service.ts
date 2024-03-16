import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SeedService {
  constructor(private readonly prisma: PrismaService) {}

  async callStoredProcedure(opcion: number) {
    try {
      const resultado = await this.prisma
        .$queryRaw`EXEC dbo.spInsertData @opcion=${opcion}`;
      //console.log(resultado[0]);
      return resultado[0]; // Esto dependerá de lo que devuelva tu Stored Procedure
    } catch (error) {
      throw new NotFoundException(
        `Error al llamar al Stored Procedure: ${error.message}`,
      );
    }
  }
}
