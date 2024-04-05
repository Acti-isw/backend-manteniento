import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SalidaEntStockDTO } from '../dto/dto/salidaEntStock.dto';
import { SalidaEntradaItemService } from 'src/salida-entrada-item/services/salida-entrada-item.service';
import { SalidaEntStockUpdateDTO } from '../dto/dto/salidaEntStock.dto';
import { SalidaEntradaItem } from '@prisma/client';

@Injectable()
export class SalidaEntradaStockService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly salidaEntradaItemService: SalidaEntradaItemService,
  ) {}

  async findManySalEntStock(): Promise<SalidaEntStockDTO[]> {
    const salidaEntradaStock = await this.prisma.salidaEntradaStock.findMany({
      include: {
        SalidaEntradaItem: {
          include: {
            Item: true,
          },
        },
        Usuarios: true,
      },
      orderBy: {
        createAT: 'desc',
      },
    });
    return salidaEntradaStock;
  }
  async findEntradasStock(): Promise<SalidaEntStockDTO[]> {
    const salidaEntradaStock = await this.prisma.salidaEntradaStock.findMany({
      include: {
        SalidaEntradaItem: {
          include: {
            Item: true,
          },
        },
        Usuarios: {
          select: {
            nombreCompleto: true,
            usuario: true,
          },
        },
      },
      where: {
        isSalida: false,
      },
      orderBy: {
        createAT: 'desc',
      },
    });
    return salidaEntradaStock;
  }
  async findSalidasStock(): Promise<SalidaEntStockDTO[]> {
    const salidaEntradaStock = await this.prisma.salidaEntradaStock.findMany({
      include: {
        SalidaEntradaItem: {
          include: {
            Item: true,
          },
        },
        Usuarios: true,
      },
      where: {
        isSalida: true,
      },
      orderBy: {
        createAT: 'desc',
      },
    });
    return salidaEntradaStock;
  }

  async createSalEntStock(
    registro: SalidaEntStockDTO,
  ): Promise<SalidaEntStockDTO> {
    const { SalidaEntradaItem, ...data } = registro;
    const cantidad = SalidaEntradaItem.reduce(
      (prev, current) => prev + current.cantidad,
      0,
    );
    console.log(data);

    const salidaEntradaStock = await this.prisma.salidaEntradaStock.create({
      data: {
        ...data,
        cantidad: cantidad,
      },
    });

    const items = SalidaEntradaItem.map((salEntItem) => {
      return {
        idSalidaEntradaStock: salidaEntradaStock.idSalidaEntradaStock,
        isSalida: data.isSalida,
        idUsuario: data.idUsuario,
        idItem: salEntItem.idItem,
        cantidad: salEntItem.cantidad,
      } as SalidaEntradaItem;
    });
    console.log(items);

    const itemsCreated =
      await this.salidaEntradaItemService.createSalEntItemMany(items);

    return {
      ...salidaEntradaStock,
      SalidaEntradaItem: itemsCreated,
    };
  }

  //
  async UpdateSalEntStock(
    registro: SalidaEntStockDTO,
  ): Promise<SalidaEntStockUpdateDTO> {
    const { idSalidaEntradaStock, SalidaEntradaItem, ...data } = registro;

    const salidaEntradaStock = await this.prisma.salidaEntradaStock.update({
      data: data,
      where: { idSalidaEntradaStock: idSalidaEntradaStock },
    });

    const items = SalidaEntradaItem.map((data) => {
      return {
        idSalidaEntradaStock: salidaEntradaStock.idSalidaEntradaStock,
        ...data,
      } as SalidaEntradaItem;
    });

    const itemsUpdated =
      await this.salidaEntradaItemService.updateSalEntItemMany(items);

    return {
      ...salidaEntradaStock,
      SalidaEntradaItem: itemsUpdated,
    };
  }

  async findSalEntStockById(id: number): Promise<SalidaEntStockDTO> {
    const salEntrada = await this.prisma.salidaEntradaStock.findFirst({
      where: { idSalidaEntradaStock: id },
      include: {
        SalidaEntradaItem: true,
      },
    });

    if (!salEntrada) {
      throw new NotFoundException(
        `No se encontro salida entrada para el id:${id}`,
      );
    }
    return salEntrada;
  }

  async countEntradasInventario(): Promise<number> {
    const fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0);
    return this.prisma.salidaEntradaStock.count({
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

    return this.prisma.salidaEntradaStock.count({
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
