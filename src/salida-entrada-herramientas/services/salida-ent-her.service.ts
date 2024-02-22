import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  SalidaEntHerDTO,
  SalidaEntHerUpdateDTO,
} from '../dto/salidaEntHer.dto';
import { SalidaEntradaHerramientas } from '@prisma/client';
import { isEmpty } from 'lodash';

@Injectable()
export class SalidaEntHerService {
  constructor(private readonly prisma: PrismaService) {}

  async createSalEntHer(
    registro: SalidaEntHerDTO,
  ): Promise<SalidaEntradaHerramientas> {
    return await this.prisma.salidaEntradaHerramientas.create({
      data: registro,
    });
  }

  async updateSalEntHer(registro: SalidaEntHerUpdateDTO) {
    const { idSalidaEntradaHerramientas, ...registroUpdate } = registro;
    return await this.prisma.salidaEntradaHerramientas.update({
      where: {
        idSalidaEntradaHerramientas,
      },
      data: {
        ...registroUpdate,
      },
    });
  }

  async findSalEntHer(): Promise<SalidaEntradaHerramientas[]> {
    const salEntradas = await this.prisma.salidaEntradaHerramientas.findMany();

    if (isEmpty(salEntradas)) {
      throw new NotFoundException(
        'No se encontraron salidas y entradas de herramientas',
      );
    }
    return salEntradas;
  }

  async findSalEntHerById(id: number): Promise<SalidaEntradaHerramientas> {
    const salEntrada = await this.prisma.salidaEntradaHerramientas.findFirst({
      where: {
        idSalidaEntradaHerramientas: id,
      },
    });

    if (!salEntrada) {
      throw new NotFoundException(
        `No se enctro salida entrada para la herramienta con id:${id}`,
      );
    }
    return salEntrada;
  }
}
