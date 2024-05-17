import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  SalidaEntHerDTO,
  SalidaEntHerUpdateDTO,
} from '../dto/salidaEntHer.dto';
import {
  INVSalidaEntradaHerramientas,
  visINVSalidaEntradaHerramientas,
} from '@prisma/client';
import { isEmpty } from 'lodash';

@Injectable()
export class SalidaEntHerService {
  constructor(private readonly prisma: PrismaService) {}

  async createSalEntHer(
    registro: SalidaEntHerDTO,
  ): Promise<INVSalidaEntradaHerramientas> {
    return await this.prisma.iNVSalidaEntradaHerramientas.create({
      data: registro,
    });
  }

  async updateSalEntHer(registro: SalidaEntHerUpdateDTO) {
    const { idSalidaEntradaHerramientas, ...registroUpdate } = registro;
    return await this.prisma.iNVSalidaEntradaHerramientas.update({
      where: {
        idSalidaEntradaHerramientas,
      },
      data: {
        ...registroUpdate,
      },
    });
  }

  async findSalEntHer(): Promise<visINVSalidaEntradaHerramientas[]> {
    const salEntradas =
      await this.prisma.visINVSalidaEntradaHerramientas.findMany();

    if (isEmpty(salEntradas)) {
      throw new NotFoundException(
        'No se encontraron salidas y entradas de herramientas',
      );
    }
    return salEntradas;
  }

  async findSalEntHerById(
    id: number,
  ): Promise<visINVSalidaEntradaHerramientas> {
    const salEntrada =
      await this.prisma.visINVSalidaEntradaHerramientas.findFirst({
        where: {
          idSalidaEntradaHerramientas: id,
        },
      });

    if (!salEntrada) {
      throw new NotFoundException(
        `No se enctro salida entrada para la id:${id}`,
      );
    }
    return salEntrada;
  }
}
