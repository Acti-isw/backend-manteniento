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
  async createSalEntItemMany(
    registros: SalidaEntItemDTO[],
  ): Promise<SalidaEntItemDTO[]> {
    const data = await this.prisma.$transaction(
      registros.map((data) =>
        this.prisma.salidaEntradaItem.create({
          data: data,
        }),
      ),
    );
    return data;
  }
  async updateSalEntItemMany(
    registros: SalidaEntItemUpdateDTO[],
  ): Promise<SalidaEntradaItem[]> {
    const data = await this.prisma.$transaction(
      registros.map(({ idSalidaEntradaItem, ...data }) =>
        this.prisma.salidaEntradaItem.update({
          data: data,
          where: { idSalidaEntradaItem },
        }),
      ),
    );
    return data;
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

  async countEntradasInventario(): Promise<number> {
    const fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0);
    return this.prisma.salidaEntradaItem.count({
      where: {
        isSalida: false,
        createAT: {
          gte: fechaHoy, // Mayor o igual que la fecha de hoy
          lt: new Date(fechaHoy.getTime() + 86400000), // Menor que la fecha de mañana
        },
      },
    });
  }

  async countSalidasInventario(): Promise<number> {
    const fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0);
    // console.log(fechaHoy);
    // console.log(new Date(fechaHoy.getTime() + 86400000));

    return this.prisma.salidaEntradaItem.count({
      where: {
        isSalida: true,
        createAT: {
          gte: fechaHoy, // Mayor o igual que la fecha de hoy
          lt: new Date(fechaHoy.getTime() + 86400000), // Menor que la fecha de mañana
        },
      },
    });
  }
}
