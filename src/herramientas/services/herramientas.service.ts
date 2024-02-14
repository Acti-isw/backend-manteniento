import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  HerramientasDTO,
  HerramientasUpdateDTO,
} from '../dto/herramientas.dto';
import { Herramientas } from '@prisma/client';
import { pick } from 'lodash';
import { plainToClass } from 'class-transformer';
import { cleanObjectBasedOnDTO } from 'src/utils/cleanObjectBasedOnDTO';

@Injectable()
export class HerramientasService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly propertiesDTO = [
    'idHerramientas',
    'idItem',
    'codigoItson',
    'disponible',
    'createAT',
    'updateAT',
    'isDelete',
    'idUsuario',
  ];
  async createTool(herramienta: HerramientasDTO): Promise<Herramientas> {
    try {
      const filteredHerData = pick(herramienta, this.propertiesDTO);
      const herramientasDto = plainToClass(HerramientasDTO, filteredHerData);

      return await this.prisma.herramientas.create({
        data: herramientasDto,
      });
    } catch (error) {
      throw new Error('Error en createTool' + error);
    }
  }

  async updateTool(herramienta: HerramientasUpdateDTO): Promise<Herramientas> {
    try {
      const { idHerramientas, ...dataUpdate } = herramienta;
      return await this.prisma.herramientas.update({
        where: { idHerramientas },
        data: {
          ...dataUpdate,
          updateAT: new Date(),
        },
      });
    } catch (error) {
      throw new Error('Error en updateTool' + error);
    }
  }

  async findTools(): Promise<Herramientas[]> {
    try {
      return this.prisma.herramientas.findMany();
    } catch (error) {
      throw new Error('Error en findTools' + error);
    }
  }

  async findToolById(id: number): Promise<Herramientas> {
    try {
      return this.prisma.herramientas.findFirst({
        where: { idHerramientas: id },
      });
    } catch (error) {
      throw new Error('Error en findTools' + error);
    }
  }
}
