import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UnidadesDTO } from '../dto/unidades.dto';
import { Unidades } from '@prisma/client';
import { isEmpty } from 'lodash';

@Injectable()
export class UnidadesService {
  constructor(private readonly prisma: PrismaService) {}

  async createUnit(unidad: UnidadesDTO): Promise<Unidades> {
    return await this.prisma.unidades.create({
      data: unidad,
    });
  }

  async updateUnit(unidad: UnidadesDTO): Promise<Unidades> {
    const { idUnidad, ...dataToUpdate } = unidad;
    return await this.prisma.unidades.update({
      where: { idUnidad },
      data: {
        ...dataToUpdate,
        updateAT: new Date(),
      },
    });
  }

  async findUnits(): Promise<Unidades[]> {
    const units = await this.prisma.unidades.findMany();
    if (isEmpty(units)) {
      throw new NotFoundException('No se encontraron unidades');
    }
    return units;
  }

  async findUnitById(id: number): Promise<Unidades> {
    const unidad = await this.prisma.unidades.findFirst({
      where: { idUnidad: id },
    });

    if (!unidad) {
      throw new NotFoundException(`No se encontro la unidad con id:${id}`);
    }
    return unidad;
  }

  async deleteUnit(idUnidad: number): Promise<Unidades> {
    return await this.prisma.unidades.update({
      where: {
        idUnidad,
      },
      data: {
        isDelete: true,
        updateAT: new Date(),
      },
    });
  }
}
