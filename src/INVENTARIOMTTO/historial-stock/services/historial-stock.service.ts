import { Injectable, NotFoundException } from '@nestjs/common';
import { INVHistorialStock, visINVHistorialStock } from '@prisma/client';
import { isEmpty } from 'lodash';
import { PrismaService } from 'src/prisma/prisma.service';
import { HistorialStockDTO } from '../dto/historialStock.dto';

@Injectable()
export class HistorialStockService {
  constructor(private readonly prisma: PrismaService) {}

  async createStockHistory(
    history: HistorialStockDTO,
  ): Promise<INVHistorialStock> {
    return this.prisma.iNVHistorialStock.create({
      data: history,
    });
  }

  async findStockHistories(): Promise<visINVHistorialStock[]> {
    const historiales = await this.prisma.visINVHistorialStock.findMany({
      orderBy: { idHistorialStock: 'desc' },
    });
    if (isEmpty(historiales)) {
      throw new NotFoundException('No se encontraron los historiales de stock');
    }
    return historiales;
  }

  async findStockHistoryById(id: number): Promise<visINVHistorialStock> {
    const historial = await this.prisma.visINVHistorialStock.findFirst({
      where: { idHistorialStock: id },
    });
    if (!historial) {
      throw new NotFoundException(
        `No se encontro el historial del stock con id:${id}`,
      );
    }
    return historial;
  }
}
