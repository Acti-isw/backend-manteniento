import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  SalidaEntItemDTO,
  SalidaEntItemUpdateDTO,
} from '../dto/dto/salidaEntItem.dto';
import { INVSalidaEntradaItem, visINVSalidaEntradaItem } from '@prisma/client';
import { isEmpty } from 'lodash';

@Injectable()
export class SalidaEntradaItemService {
  constructor(private readonly prisma: PrismaService) {}

  async createSalEntItem(
    registro: SalidaEntItemDTO,
  ): Promise<INVSalidaEntradaItem> {
    return await this.prisma.iNVSalidaEntradaItem.create({
      data: registro,
    });
  }
  async createSalEntItemMany(
    registros: SalidaEntItemDTO[],
  ): Promise<SalidaEntItemDTO[]> {
    const data = await this.prisma.$transaction(
      registros.map((data) =>
        this.prisma.iNVSalidaEntradaItem.create({
          data: data,
        }),
      ),
    );
    return data;
  }
  async updateSalEntItemMany(
    registros: SalidaEntItemUpdateDTO[],
  ): Promise<INVSalidaEntradaItem[]> {
    const data = await this.prisma.$transaction(
      registros.map(({ idSalidaEntradaItem, ...data }) =>
        this.prisma.iNVSalidaEntradaItem.update({
          data: data,
          where: { idSalidaEntradaItem },
        }),
      ),
    );
    return data;
  }

  async updateSalEntItem(registro: SalidaEntItemUpdateDTO) {
    const { idSalidaEntradaItem, ...registroUpdate } = registro;
    return await this.prisma.iNVSalidaEntradaItem.update({
      where: { idSalidaEntradaItem },
      data: { ...registroUpdate },
    });
  }

  async findSalEntItem(): Promise<visINVSalidaEntradaItem[]> {
    const salEntradas = await this.prisma.visINVSalidaEntradaItem.findMany({
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
  async findSalEntItemById(id: number): Promise<visINVSalidaEntradaItem> {
    const salEntradas = await this.prisma.visINVSalidaEntradaItem.findFirst({
      where: { idSalidaEntradaItem: id },
      orderBy: {
        createAT: 'desc',
      },
    });

    if (isEmpty(salEntradas)) {
      throw new NotFoundException('No se encontro salida o entrada');
    }
    return salEntradas;
  }
  // async findEntradasInventario(): Promise<visSalidaEntradaItem[]> {
  //   const entradas = await this.prisma.visSalidaEntradaItem.findMany({
  //     orderBy: {
  //       createAT: 'desc',
  //     },
  //     where: {
  //       isSalida: false,
  //     },
  //   });

  //   if (isEmpty(entradas)) {
  //     throw new NotFoundException(
  //       'No se encontraron salidas y entradas de Items',
  //     );
  //   }
  //   return entradas;
  // }
  // async findSalidasInventario(): Promise<visSalidaEntradaItem[]> {
  //   const entradas = await this.prisma.visSalidaEntradaItem.findMany({
  //     orderBy: {
  //       createAT: 'desc',
  //     },
  //     where: {
  //       isSalida: true,
  //     },
  //   });

  //   if (isEmpty(entradas)) {
  //     throw new NotFoundException(
  //       'No se encontraron salidas y entradas de Items',
  //     );
  //   }
  //   return entradas;
  // }
}
