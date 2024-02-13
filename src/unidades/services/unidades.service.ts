import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UnidadesDTO } from '../dto/unidades.dto';
import { Unidades } from '@prisma/client';

@Injectable()
export class UnidadesService {
  constructor(private readonly prisma: PrismaService) {}

  async createUnit(unidad: UnidadesDTO): Promise<Unidades> {
    try {
      return await this.prisma.unidades.create({
        data: unidad,
      });
    } catch (error) {
      throw new Error('Error en createUnit');
    }
  }

  async updateUnit(unidad: UnidadesDTO): Promise<Unidades> {
    try {
      const { idUnidad, ...dataToUpdate } = unidad;
      return await this.prisma.unidades.update({
        where: { idUnidad },
        data: {
          ...dataToUpdate,
          updateAT: new Date(),
        },
      });
    } catch (error) {
      throw new Error('Error en updateUnit' + error);
    }
  }

  async findUnits(): Promise<Unidades[]> {
    try {
      return this.prisma.unidades.findMany();
    } catch (error) {
      throw new Error('Error en findUnidades');
    }
  }

  async findUnitById(id: number): Promise<Unidades> {
    try {
      const unidad = await this.prisma.unidades.findFirst({
        where: { idUnidad: id },
      });

      if (!unidad) {
        //console.log("entro",catetegory)
        //throw new NotFoundException(`No se encontro la categoria con id:${id}`);
      }
      return unidad;
    } catch (error) {
      throw new Error('Error en findUnidadById' + error);
    }
  }
}
