import { Injectable, NotFoundException } from '@nestjs/common';
import { HistorialStock } from '@prisma/client';
import { isEmpty } from 'lodash';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HistorialStockService {
  constructor(private readonly prisma: PrismaService) {}

  async findStockHistories(): Promise<HistorialStock[]> {
    const historiales = await this.prisma.historialStock.findMany({
      include: {
        AccionesStock: { select: { nombre: true } },
        Item: { select: { nombre: true } },
        Usuarios: { select: { nombreCompleto: true } },
      },
    });
    if (isEmpty(historiales)) {
      throw new NotFoundException('No se encontraron los historiales de stock');
    }
    return historiales;
  }

  async findStockHistoryById(id: number): Promise<HistorialStock> {
    const historial = await this.prisma.historialStock.findFirst({
      where: { idHistorialStock: id },
      include: {
        AccionesStock: { select: { nombre: true } },
        Item: { select: { nombre: true } },
        Usuarios: { select: { nombreCompleto: true } },
      },
    });
    if (!historial) {
      throw new NotFoundException(
        `No se encontro el historial del stock con id:${id}`,
      );
    }
    return historial;
  }
}
