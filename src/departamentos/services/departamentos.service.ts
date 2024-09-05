import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Departamentos, Unidades } from '@prisma/client';
import { isEmpty } from 'lodash';
import {
  DepartamentosDTO,
  DepartamentosUpdateDTO,
} from '../dto/departamentos.dto';

@Injectable()
export class DepartamentosService {
  constructor(private readonly prisma: PrismaService) {}

  async createDepartamento(
    departamento: DepartamentosDTO,
  ): Promise<Departamentos> {
    return await this.prisma.departamentos.create({
      data: departamento,
    });
  }

  async updateDepartamento(
    departamentos: DepartamentosUpdateDTO,
  ): Promise<Departamentos> {
    const { idDepartamento, ...dataToUpdate } = departamentos;
    return await this.prisma.departamentos.update({
      where: { idDepartamento },
      data: {
        ...dataToUpdate,
        updateAT: new Date(),
      },
    });
  }

  async findDepartamento(): Promise<Departamentos[]> {
    const Departamentos = await this.prisma.departamentos.findMany({
      where: {
        isDelete: false,
      },
    });
    if (isEmpty(Departamentos)) {
      throw new NotFoundException('No se encontraron departamentoss');
    }
    return Departamentos;
  }

  async findDepartamentoById(id: number): Promise<Unidades> {
    const unidad = await this.prisma.unidades.findFirst({
      where: { idUnidad: id },
    });

    if (!unidad) {
      throw new NotFoundException(
        `No se encontro el departamentos con id:${id}`,
      );
    }
    return unidad;
  }

  async deleteDepartamento(idDepartamento: number): Promise<Departamentos> {
    return await this.prisma.departamentos.update({
      where: {
        idDepartamento: idDepartamento,
      },
      data: {
        isDelete: true,
        updateAT: new Date(),
      },
    });
  }

  async countDepartamentos(): Promise<number> {
    return await this.prisma.departamentos.count({
      where: { isDelete: false },
    });
  }
}
