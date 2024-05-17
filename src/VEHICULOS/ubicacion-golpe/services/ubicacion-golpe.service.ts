import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UbicacionGolpeDTO } from '../dto/ubicacionGolpe.dto';
import { VEHUbicacionGolpe, visVEHUbicacionGolpe } from '@prisma/client';
import { isEmpty } from 'lodash';

@Injectable()
export class UbicacionGolpeService {
  constructor(private readonly prisma: PrismaService) {}

  async createManyUbicacionGolpe(golpes: UbicacionGolpeDTO[]) {
    return await this.prisma.vEHUbicacionGolpe.createMany({
      data: golpes,
    });
  }

  async createUbicacionGolpe(
    golpe: UbicacionGolpeDTO,
  ): Promise<VEHUbicacionGolpe> {
    return await this.prisma.vEHUbicacionGolpe.create({
      data: golpe,
    });
  }

  async findUbicacionGolpeById(
    id: number,
    isSalida: boolean,
  ): Promise<visVEHUbicacionGolpe> {
    const ubicacion = await this.prisma.visVEHUbicacionGolpe.findUnique({
      where: { idSolicitud: id, isSalida },
    });

    if (!ubicacion) {
      throw new NotFoundException(
        `No se encontro la ubicacion del golpe con id:${id}`,
      );
    }

    return ubicacion;
  }

  async findUbicacionGolpes(): Promise<visVEHUbicacionGolpe[]> {
    const ubicacion = await this.prisma.visVEHUbicacionGolpe.findMany();

    if (isEmpty(ubicacion)) {
      throw new NotFoundException('No se encontraron ubicaciones de golpes');
    }

    return ubicacion;
  }
}
