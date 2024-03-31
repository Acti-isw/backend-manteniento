import { Injectable, NotFoundException } from '@nestjs/common';
import { HistorialStock, visHistorialStock } from '@prisma/client';
import { isEmpty } from 'lodash';
import { PrismaService } from 'src/prisma/prisma.service';
import { HistorialStockDTO } from '../dto/historialStock.dto';

@Injectable()
export class HistorialStockService {
  constructor(private readonly prisma: PrismaService) {}

  async createStockHistory(
    history: HistorialStockDTO,
  ): Promise<HistorialStock> {
    return this.prisma.historialStock.create({
      data: history,
    });
  }

  async findStockHistories(): Promise<visHistorialStock[]> {
    const historiales = await this.prisma.visHistorialStock.findMany();
    if (isEmpty(historiales)) {
      throw new NotFoundException('No se encontraron los historiales de stock');
    }
    return historiales;
  }

  async findStockHistoryById(id: number): Promise<visHistorialStock> {
    const historial = await this.prisma.visHistorialStock.findFirst({
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
