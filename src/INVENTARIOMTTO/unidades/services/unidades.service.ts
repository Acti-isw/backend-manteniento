import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UnidadesDTO } from '../dto/unidades.dto';
import { INVUnidades } from '@prisma/client';
import { isEmpty } from 'lodash';

@Injectable()
export class UnidadesService {
  constructor(private readonly prisma: PrismaService) {}

  async createUnit(unidad: UnidadesDTO): Promise<INVUnidades> {
    return await this.prisma.iNVUnidades.create({
      data: unidad,
    });
  }

  async updateUnit(unidad: UnidadesDTO): Promise<INVUnidades> {
    const { idUnidad, ...dataToUpdate } = unidad;
    return await this.prisma.iNVUnidades.update({
      where: { idUnidad },
      data: {
        ...dataToUpdate,
        updateAT: new Date(),
      },
    });
  }

  async findUnits(): Promise<INVUnidades[]> {
    const units = await this.prisma.iNVUnidades.findMany();
    if (isEmpty(units)) {
      throw new NotFoundException('No se encontraron unidades');
    }
    return units;
  }

  async findUnitById(id: number): Promise<INVUnidades> {
    const unidad = await this.prisma.iNVUnidades.findFirst({
      where: { idUnidad: id },
    });

    if (!unidad) {
      throw new NotFoundException(`No se encontro la unidad con id:${id}`);
    }
    return unidad;
  }

  async deleteUnit(idUnidad: number): Promise<INVUnidades> {
    return await this.prisma.iNVUnidades.update({
      where: {
        idUnidad,
      },
      data: {
        isDelete: true,
        updateAT: new Date(),
      },
    });
  }

  async countUnits(): Promise<number> {
    return await this.prisma.iNVUnidades.count({
      where: { isDelete: false },
    });
  }
}
