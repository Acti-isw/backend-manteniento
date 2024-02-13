import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  HerramientasDTO,
  HerramientasUpdateDTO,
} from '../dto/herramientas.dto';
import { Herramientas } from '@prisma/client';

@Injectable()
export class HerramientasService {
  constructor(private readonly prisma: PrismaService) {}

  async createTool(herramienta: HerramientasDTO): Promise<Herramientas> {
    try {
      return await this.prisma.herramientas.create({
        data: herramienta,
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
