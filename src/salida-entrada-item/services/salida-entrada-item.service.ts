import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  SalidaEntItemDTO,
  SalidaEntItemUpdateDTO,
} from '../dto/dto/salidaEntItem.dto';
import { SalidaEntradaItem, visSalidaEntradaItem } from '@prisma/client';
import { isEmpty } from 'lodash';

@Injectable()
export class SalidaEntradaItemService {
  constructor(private readonly prisma: PrismaService) {}

  async createSalEntItem(
    registro: SalidaEntItemDTO,
  ): Promise<SalidaEntradaItem> {
    return await this.prisma.salidaEntradaItem.create({
      data: registro,
    });
  }

  async updateSalEntItem(registro: SalidaEntItemUpdateDTO) {
    const { idSalidaEntradaItem, ...registroUpdate } = registro;
    return await this.prisma.salidaEntradaItem.update({
      where: { idSalidaEntradaItem },
      data: { ...registroUpdate },
    });
  }

  async findSalEntItem(): Promise<visSalidaEntradaItem[]> {
    const salEntradas = await this.prisma.visSalidaEntradaItem.findMany({
      orderBy: {
        createAT: 'desc',
      },
    });

    if (isEmpty(salEntradas)) {
      throw new NotFoundException(
        'No se encontraron salidas y entradas de Items',
      );
    }
    return salEntradas;
  }

  async findSalEntItemById(id: number): Promise<visSalidaEntradaItem> {
    const salEntrada = await this.prisma.visSalidaEntradaItem.findFirst({
      where: { idSalidaEntradaItem: id },
    });

    if (!salEntrada) {
      throw new NotFoundException(
        `No se encontro salida entrada para el id:${id}`,
      );
    }
    return salEntrada;
  }

  async findEntradasInventario(): Promise<visSalidaEntradaItem[]> {
    const entradas = await this.prisma.visSalidaEntradaItem.findMany({
      orderBy: {
        createAT: 'desc',
      },
      where: {
        isSalida: false,
      },
    });

    if (isEmpty(entradas)) {
      throw new NotFoundException('No se encontraron entradas de Items');
    }
    return entradas;
  }

  async findSalidasInventario(): Promise<visSalidaEntradaItem[]> {
    const entradas = await this.prisma.visSalidaEntradaItem.findMany({
      orderBy: {
        createAT: 'desc',
      },
      where: {
        isSalida: true,
      },
    });

    if (isEmpty(entradas)) {
      throw new NotFoundException('No se encontraron salidas de Items');
    }
    return entradas;
  }

  async countEntradasInventario(): Promise<number> {
    return this.prisma.salidaEntradaItem.count({
      where: { isSalida: false },
    });
  }

  async countSalidasInventario(): Promise<number> {
    return this.prisma.salidaEntradaItem.count({
      where: { isSalida: true },
    });
  }
}
